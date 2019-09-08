const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');
const EmailController = require('./controllers/email_controller');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// multi-process to utilize all CPU cores
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
} else {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use((err, req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        res.status(422).send({ errors: err.message });
    });

    // priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../client/build')));

    app.get('/', (req, res) => res.send('Hello World!'));
    app.post('/api/email', EmailController.sendEmail);
    app.get('/api', function(req, res) {
        res.set('Content-Type', 'application/json');
        res.send('{"message":"Hello from the custom server!"}');
    });

    app.get('*', function(request, response) {
        response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

    app.listen(PORT, function() {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
    });
}

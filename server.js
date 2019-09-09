const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/main.js');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// Configure body parser for AJAX requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Serve up static assets
app.use(express.static('client/build'));

// Enable CORS from client-side
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cors());
app.use(morgan('dev'));

app.use(routes);

// Start the API server
app.listen(config.port, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${config.port}!`);
});

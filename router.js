const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

module.exports = function(app) {
    const apiRoutes = express.Router();
    const transporter = nodemailer.createTransport('smtps://mlaw8788%40gmail.com:tbone2888@smtp.gmail.com');

    app.use('/api', apiRoutes);

    apiRoutes.route('/submit').post(function(req, res) {
        console.log('route received as req.body:', req.body);

        const mailOptions = {
            from: 'mlaw8788@gmail.com',
            to: 'dahnielkim@gmail.com',
            subject: 'Sending some data',
            text: JSON.stringify(req.body),
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

    app.get('*', function(request, response) {
        response.sendFile(path.join(__dirname, './client/build/index.html'));
    });
};

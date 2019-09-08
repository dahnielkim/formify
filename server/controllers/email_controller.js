const nodemailer = require('nodemailer');

//'smtps://[email_address]%40gmail.com:[password]@smtp.gmail.com'
let transporter = nodemailer.createTransport('smtps://mlaw8788%40gmail.com:tbone2888@smtp.gmail.com');

function parseData(_data) {
    let arrCsv = [];
    let result = {};
    let commonData = [];
    Object.keys(_data).forEach(key => {
        let value = _data[key];
        if (!Array.isArray(value)) {
            commonData.push(value);
        }
    });

    Object.keys(_data).forEach(key => {
        let value = _data[key];
        if (Array.isArray(value)) {
            value.forEach(obj => {
                let chunk = [];
                Object.keys(obj).forEach(key => {
                    let attribute = obj[key];
                    chunk.push(attribute);
                });
                arrCsv.push(chunk.concat(commonData).join(','));
            });
            result[key] = arrCsv.join('\r\n');
            arrCsv = [];
        }
    });
    return result;
}

module.exports = {
    sendEmail(req, res, next) {
        let data = req.body;
        let body = parseData(data);
        console.log('body', body);

        var mailOptions = {
            from: '"mlaw" <mlaw8788@gmail.com>',
            to: 'dahnielkim@gmail.com', //email to send to
            subject: `Test Subject`,
            text: `test`,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.send(data);
    },
};

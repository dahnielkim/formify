const nodemailer = require('nodemailer');
const SMPTConfigObj = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'mlaw8788@gmail.com',
        pass: 'tbone2888EfA+!a',
    },
    tls: {
        rejectUnauthorized: false,
    },
    service: 'gmail',
};

module.exports = {
    sendEmail: (req, res) => {
        // const transporter = nodemailer.createTransport('smtps://mlaw8788%40gmail.com:tbone2888@smtp.gmail.com');
        const transporter = nodemailer.createTransport(SMPTConfigObj);

        // TODO: missing report name
        let emailBody = '';

        if (req.body.id) {
            for (let i = 0; i < req.body.unpaidInvoices.length; i++) {
                emailBody += req.body.id + '|';
                emailBody += req.body.vendor_name + '|';
                emailBody += req.body.email + '|';
                emailBody += 'unpaid_invoices|';
                emailBody += req.body.unpaidInvoices[i].description + '|';
                emailBody += req.body.unpaidInvoices[i].amount + '|';
                emailBody += req.body.unpaidInvoices[i].period + '\n';
            }

            for (let i = 0; i < req.body.uninvoicedInvoices.length; i++) {
                emailBody += req.body.id + '|';
                emailBody += req.body.vendor_name + '|';
                emailBody += req.body.email + '|';
                emailBody += 'uninvoiced_invoices|';
                emailBody += req.body.uninvoicedInvoices[i].description + '|';
                emailBody += req.body.uninvoicedInvoices[i].amount + '|';
                emailBody += req.body.uninvoicedInvoices[i].period + '\n';
            }

            const mailOptions = {
                from: 'mlaw8788@gmail.com',
                to: 'jctestinbox@gmail.com',
                subject: req.body.id,
                text: emailBody,
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.send(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json(info.response);
                }
            });
        }
    },
};

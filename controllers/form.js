const nodemailer = require('nodemailer');

module.exports = {
    sendEmail: (req, res) => {
        const transporter = nodemailer.createTransport('smtps://mlaw8788%40gmail.com:tbone2888@smtp.gmail.com');
        // TODO: missing report name
        let emailBody = '';

        if (req.body.id) {
            for (let i = 0; i < req.body.unpaidInvoices.length; i++) {
                emailBody += 'report_id|' + req.body.id + '|';
                emailBody += 'vendor_name|' + req.body.vendor_name + '|';
                emailBody += 'vendor_email|' + req.body.email + '|';
                emailBody += 'type|unpaid_invoices|';
                emailBody += 'description|' + req.body.unpaidInvoices[i].description + '|';
                emailBody += 'amount|' + req.body.unpaidInvoices[i].amount + '|';
                emailBody += 'period|' + req.body.unpaidInvoices[i].period + '\n';
            }

            for (let i = 0; i < req.body.uninvoicedInvoices.length; i++) {
                emailBody += 'report_id|' + req.body.id + '|';
                emailBody += 'vendor_name|' + req.body.vendor_name + '|';
                emailBody += 'vendor_email|' + req.body.email + '|';
                emailBody += 'type|uninvoiced_invoices|';
                emailBody += 'description|' + req.body.uninvoicedInvoices[i].description + '|';
                emailBody += 'amount|' + req.body.uninvoicedInvoices[i].amount + '|';
                emailBody += 'period|' + req.body.uninvoicedInvoices[i].period + '\n';
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

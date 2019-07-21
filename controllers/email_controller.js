const nodemailer = require('nodemailer');

//'smtps://[email_address]%40gmail.com:[password]@smtp.gmail.com'
var transporter = nodemailer.createTransport('smtps://mlaw8788%40gmail.com:tbone2888@smtp.gmail.com');

module.exports = {
    sendEmail(req, res, next) {
        let data = req.body;
        console.log(data);

        var mailOptions = {
        from: '"mlaw" <mlaw8788@gmail.com>',
        to: '', //email to send to
        subject: `Test Subject`,
        text: `test`
      };

      //uncomment to send email

      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });


      // res.send(data)
    }
}

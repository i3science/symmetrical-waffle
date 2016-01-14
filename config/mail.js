var config = require('./config'),
    nodemailer = require('nodemailer');

// Create reusable transporter object using the default SMTP transport
module.exports = nodemailer.createTransport(config.mail.transport);

// // Set up email data with unicode symbols
// let mailOptions = {
//     from: 'Fred Foo <foo@blurdybloop.com>',
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com',
//     subject: 'Hello',
//     text: 'Hello World',
//     html: '<b>Hello World</b>'
// };

// // Send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: ', info.response);
// })
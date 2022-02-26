import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

//const host = process.env.MAIL_HOST;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT!),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      //user: "info@cnc-op.ru", // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
      //pass: "D5Ehhi*R", // generated ethereal password
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Шахматный турнир" ${process.env.MAIL_FROM_ADDRESS}`, // sender address
    to: "vbachmanov@mail.ru", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  //res.json(tables);
}

const express = require("express");
const app = express();
const port = 8000;
var nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// just for example access controll is set to all

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/sendMail", async (req, res) => {
  console.log("======>", req.body);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kumarley.tejas7.tk15@gmail.com",
      pass: "ldfsyrkhqstusenl",
    },
  });
  const mailOptions = {
    from: "kumarley.tejas7.tk15@gmail.com", // sender address
    to: req.body.email, // list of receivers
    subject: req.body.subject, // Subject line
    html: req.body.htmlBody, // plain text body
  };
  try {
    const mailState = await transporter.sendMail(mailOptions);
    console.log("Mail was sent ?=>", mailState);
    res.send(mailState);
  } catch (error) {
    console.log("===>", error);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

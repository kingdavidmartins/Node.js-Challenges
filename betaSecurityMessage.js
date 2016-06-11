// After getting hired I've been tasked with finding some way to protect the privacy of
// the new beta site that has been launched. To enter the beta site it requires a password.
// The quality assurance team are testing the sites behavior in production and have access to the password.
// Since the beta is highly anticipated hackers have been trying to gain access. Create a response
// that will alert the betaProject Admin by sending a text to their numbers if the password used was incorrect
// by letting them know someone has tried to gain access but failed and they should try to change the beta Site
// password for security reasons.

import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

import config from "./config.js";
const betaSitePassword = config.betaSitePassword;

const accountSid = config.twilio.TWILIO_ACCOUNT_SID;
const authToken = config.twilio.TWILIO_AUTH_TOKEN;
const twilioFromNumber = config.twilio.TWILIO_NUMBER;
import twilio from 'twilio';
const client = new twilio.RestClient(accountSid, authToken);

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("<html><h1>Website</h1></html"));

app.get("/beta", (req, res) => {
  res.send("<html><h1>Beta Site.</h1><form method='post'><br>Please Input Password<input type='password' name='password'><br><input type='submit'></form></html>");
});

app.post("/beta", (req, res) => {
  res.send(
    (req.body.password === betaSitePassword) // statement
      ? "<html><h1>Welcome to Beta Site</h1></html>" // run if true
      : "<html><h1>Err: Invalid Password</h1></html>"); // run if false
  (req.body.password !== betaSitePassword) // statement
    ? fs.readFile("betaSecurityMessageAdminData.json", "utf8" , (err, data) => //run if true
        console.log(
          (err) // statement
            ? `Log: ${err}` // run if true
            : JSON.parse(data) // run if false
                .map((obj) =>
                  client.messages.create(
                    {
                      to: obj.number,
                      from: twilioFromNumber,
                      body: "Someone tried to access Beta Site. Please change Password!"
                    },
                    (err, message) =>
                      console.log(
                        (err) // statement
                          ? `Log: ${JSON.stringify(err)}` // run if true
                          : `Message was a success. Message ID: ${message.sid}`) )))) // run if false
    : "Password was correct"; // run if false
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));

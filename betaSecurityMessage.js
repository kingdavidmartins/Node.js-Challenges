// After getting hired I've been tasked with finding some way to protect the privacy of
// the new beta site that has been launched. To enter the beta site it requires a password.
// The quality assurance team are testing the sites behavior in production and have access to the password.
// Since the beta is highly anticipated hackers have been trying to gain access. Create a response
// that will alert the betaProject Admin by sending a text to their numbers if the password used was incorrect
// by letting them know someone has tried to gain access but failed and they should try to change the beta Site
// password for security reasons.

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var config = require("./config.js");
var betaSitePassword = config.betaSitePassword;

var accountSid = config.twilio.TWILIO_ACCOUNT_SID;
var authToken = config.twilio.TWILIO_AUTH_TOKEN;
var twilioFromNumber = config.twilio.TWILIO_NUMBER;
var client = require('twilio')(accountSid, authToken);

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("<html><h1>Website</h1></html"));

app.get("/beta", (req, res) => {
  res.send("<html><h1>Beta Site.</h1><form method='post'><br>Please Input Password<input type='password' name='password'><br><input type='submit'></form></html>");
});

app.post("/beta", (req, res) => {
  res.send( req.body.password === betaSitePassword ? "<html><h1>Welcome to Beta Site</h1></html>" : "<html><h1>Err: Invalid Password</h1></html>");
  req.body.password !== betaSitePassword ? fs.readFile("betaSecurityMessageAdminData.json", "utf8" , (err, data) => console.log(err ? `Log: ${err}` : JSON.parse(data).map((obj) => client.messages.create({ to: obj.number, from: twilioFromNumber, body: "Someone tried to access Beta Site. Please change Password!" }, (err, message) => console.log(err ? `Log: ${JSON.stringify(err)}` : `Message was a success. Message ID: ${message.sid}`) )))) : "Password was correct";
})

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));

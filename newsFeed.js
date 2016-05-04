// Your 1st day as a developer you are tasked with creating a function called newsFeed that
// will take read all the users postMessage that was sent to the DB and print them
// in the following formant. user userName : message. order by date posted or time posted is irrelevant

var fs = require('fs');
var newsFeed = () => fs.readFile("newsFeedData.json", "utf8", (err, data) => console.log(err ? "err: " + err : JSON.parse(data).map((obj) => obj.postMessage !== undefined ? obj.postMessage.map((postMessage) => `User ${obj.user} : ${postMessage.text}`).join("\n") : "a" ).filter((value) => value !== "a").join("\n")));
newsFeed();

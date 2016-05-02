// You made a website that started to gain traction & you want to add a new feature that
// will let users know who's online and who's offline. when users active equals true user is
// online. when active is false user is offline. create a function user status that
// print out which users are online and which users are offline seperated by lines

var fs = require('fs');
var userStatus = () => fs.readFile("onlinevsOfflineData.json", "utf8", (err, data) => console.log(err ? "err: " + err : JSON.parse(data).filter((value) => value.active === true).map((value) => value.user + " is online").join("\n"), "\n" + JSON.parse(data).filter((value) => value.active === false).map((value) => value.user + " is offline").join("\n")));
userStatus();

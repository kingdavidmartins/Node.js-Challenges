// You made a website that started to gain traction & you want to add a new feature that
// will let users know who's online and who's offline. when users active equals true user is
// online. when active is false user is offline. create a function user status that
// print out which users are online and which users are offline seperated by lines

import fs from 'fs'
const userStatus = () =>
  fs.readFile("onlinevsOfflineData.json", "utf8", (err, data) =>
    console.log(
      (err) // statement
      ? `log:  + ${err}` // run if true
      : JSON.parse(data) // run if false
          .filter((obj) => obj.active === true)
          .map((obj) => obj.user + " is online")
          .join("\n")
          + "\n"
          + JSON.parse(data)
          .filter((obj) => obj.active === false)
          .map((obj) => obj.user + " is offline")
          .join("\n")))
userStatus()

// Your 1st day as a developer you are tasked with creating a function called newsFeed that
// will take read all the users postMessage that was sent to the DB and print them
// in the following formant. user userName : message. order by date posted or time posted is irrelevant

import fs from 'fs'
const newsFeed = () =>
  fs.readFile("newsFeedData.json", "utf8", (err, data) =>
    console.log(
      (err) // statement
        ? `log: ${err}` // run if true
        : JSON.parse(data) // run if false
            .map((obj) =>
              (obj.postMessage !== undefined) // statement
                ? obj.postMessage // run if true
                  .map((postMessage) => `User ${obj.user} : ${postMessage.text}`)
                  .join("\n")
                : "a") // run if false
            .filter((value) => value !== "a")
            .join("\n")))
newsFeed()

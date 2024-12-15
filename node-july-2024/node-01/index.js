const http = require("http");
const fs = require("fs");
const { url } = require("inspector");

const server = http.createServer(function (req, res) {
  // Handling incomming request

  fs.appendFileSync(
    "log.txt",
    `[${new Date().toLocaleDateString()}]: ${req.url}\n`
  );

  try {
    switch (req.url) {
      case "/":
        return res.end("Homepage");
      case "/about":
        return res.end("I am Piyush Garg");
      case "/search":
        return res.endd("You are in search page");
      case "/logs": {
        const data = fs.readFileSync("log.txt", "utf-8");
        return res.end(data);
      }
    }
    res.statusCode = 404;
    return res.end("Not Found, Please Try Someother thing");
  } catch (err) {
    // We can send a notification to the dev err | Cloudwatch Alarams
    res.statusCode = 500;
    return res.end(
      "Internal Server, Something is wrong w me, Please tryu again later"
    );
  }
});

server.listen(8000, () => console.log("Http Server Started on PORT 8000"));

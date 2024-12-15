const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("custom-name", "Piyush Garg");
  res.cookie("jwt", "this-is-jwt-token", { httpOnly: true });
  res.json({ status: "done" });
});

app.get("/", (req, res) => {
  const cookiesOnServerIGotBack = req.cookies.jwt;
  res.json({ cookiesOnServerIGotBack });
});

app.listen(9000);

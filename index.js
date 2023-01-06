const express = require("express");
const fs = require("fs");
var path = require("path");
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));
????    
const app = express();

function authentication(req, res, next) {
  var authheader = req.headers.authorization;
  console.log(req.headers);

  if (!authheader) {
    var err = new Error("please authenticate yourself");
    res.setHeader("WWW-authenticate", "Basic");
    err.status = 401;
    return next(err);
  }

  var auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(";");
  var user = auth[0];
  var pass = auth[1];

  if (user == "Abhinav" && pass == "Abhi") {
    next();
  } else {
    var err = new Error("please authenticate yourself");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  }
}

app.get("/getName", (req, res) => {
  res.send("Hello Abhinav");
});

app.get("/getNumber", (req, res) => {
  res.send("85693456");
});

app.use(authentication);
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("server is running");
});

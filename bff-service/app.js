var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var axios = require("axios");
require("dotenv").config();
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const nodecache = require("node-cache");

const appCache = new nodecache({ stdTTL: 120 });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.all("/*", (req, res) => {
  const APISelector = req.originalUrl.split("/")[1];
  const APIurl = process.env[APISelector];
  console.log(APIurl + req.originalUrl);
  if (APIurl) {
    const axiosConfig = {
      method: req.method,
      url: APIurl + req.originalUrl,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
    };
    axios(axiosConfig).then((response) => {
      if (req.method === "GET") {
        if (appCache.has(APISelector)) {
          return res.json(appCache.get(APISelector));
        } else {
          appCache.set(APISelector, response.data);
          res.json(response.data);
        }
      } else res.json(response.data);
    });
  } else {
    res.status(502).send("Cannot process request");
  }
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

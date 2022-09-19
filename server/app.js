/* Module Dependencies. */
const cors = require("cors");

const express = require("express");

const logger = require("morgan");

const httpStatus = require("http-status");

require("dotenv").config({ path: "./.env" });

const errorHandler = require("errorhandler");

const jwt = require("jsonwebtoken");

/* Create Express Server. */
const app = express();

app.use(cors());

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
  compress: "gzip",
  maxFiles: 7,
});
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger("combined", { stream: accessLogStream }));

/* Express Configuration. */
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Primary App Routes. */
app.get("/", (_req, res) => {
  res.status(httpStatus.OK).json({
    data: {
      message: "API endpoints for .",
    },
  });
});

/* API Route for login, register */

// jwt
app.use((req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      error: "Auth Token is not supplied",
    });
  }
});

/* API endpoints for admin. */

app.use((err, _req, res, next) => {
  if (!err) {
    next();
    return;
  }
  const errObj = _.pick(err, "message", "meta.url");
  let { statusCode } = err;

  if (!statusCode) {
    statusCode =
      err.constructor.name === "AssertionError"
        ? httpStatus.BAD_REQUEST
        : httpStatus.BAD_GATEWAY;
  }

  res.status(statusCode).json(errObj);
});

/**
 * Error Handler. Provides full stack - remove from production
 * Morgan Logger.
 */
if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler());
}

app.listen(app.get("port"), () => {
  // eslint-disable-next-line no-console
  console.log(`listening on *:${app.get("port")} in ${app.get("env")} mode`);
});

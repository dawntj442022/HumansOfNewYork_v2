const methodOverride = require("method-override");
const morgan = require("morgan"); //import morgan
const session = require("express-session");
const MongoStore = require("connect-mongo");
const express = require("express");

const setupMiddleware = (app) => {
  app.use(morgan("tiny"));
  app.use(express.static("public"));

  app.use(methodOverride("_method"));
  app.use((req, res, next) => {
    res.locals.data = {};
    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      saveUninitialized: true,
      resave: true,
    })
  );
};

module.exports = setupMiddleware;

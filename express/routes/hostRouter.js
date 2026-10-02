
// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const {getAddHome, postAddHome} = require("../controllers/homes");

hostRouter.get("/add-home", (req, res, next) => {
  getAddHome(req, res, next);
});


hostRouter.post("/add-home", (req, res, next) => {postAddHome(req, res, next);
});

exports.hostRouter = hostRouter;


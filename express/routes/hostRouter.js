// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const { getAddHome, postAddHome, getHostHomes } = require("../controllers/hostController");

hostRouter.get("/add-home", (req, res, next) => {
  getAddHome(req, res, next);
});

hostRouter.get("/host-home-list",(req, res, next) => {
  getHostHomes(req, res, next);
})

hostRouter.post("/add-home", (req, res, next) => {
  postAddHome(req, res, next);
});

module.exports = hostRouter;

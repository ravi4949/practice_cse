// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module
const { getHomes } = require("../controllers/homes");

userRouter.get("/", (req, res) => {
  getHomes(req, res);
});

module.exports = userRouter;

// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module
const { registeredHomes } = require("./hostRouter");

userRouter.get("/", (req, res) => {
  res.render("home", {
    registeredHomes:registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "Home",
  });
});



module.exports = userRouter;

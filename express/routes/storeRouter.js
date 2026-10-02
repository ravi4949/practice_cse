// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const { getHomes, getBookings, getFavouriteList, getIndex } = require("../controllers/storeController");

storeRouter.get("/", (req, res) => {
  getIndex(req, res);
});

storeRouter.get("/home-list", (req, res) => {
  getHomes(req, res);
});

storeRouter.get("/bookings", (req, res) => {
  getBookings(req, res);
});

storeRouter.get("/favourite-list", (req, res) => {
  console.log("Fetching favourite list...");
  getFavouriteList(req, res);
});




module.exports = storeRouter;

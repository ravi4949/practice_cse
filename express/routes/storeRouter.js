// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const { getHomes, getBookings, getFavouriteList, getIndex, getHomeDetails, postAddToFavourite } = require("../controllers/storeController");

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
  getFavouriteList(req, res);
});

storeRouter.get("/home-list/:homeId", (req, res) => {
  getHomeDetails(req, res);
});

storeRouter.post("/favourite-list", (req, res) => {
  postAddToFavourite(req, res);
});

module.exports = storeRouter;

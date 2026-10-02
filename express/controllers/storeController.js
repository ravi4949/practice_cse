const Home = require("../models/home");


exports.getIndex = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Index",
    });
  });
};

exports.getHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res) => {
    res.render("store/bookings", {
      pageTitle: "airbnb Bookings",
      currentPage: "Bookings",
    });
};


exports.getFavouriteList = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Favourite List",
      currentPage: "Favourite List",
    });
  });
};

 
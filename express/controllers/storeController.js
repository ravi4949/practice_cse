const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Index",
    }); 
  });
};

exports.getHomes = (req, res) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([rows]) => {
    const home = rows[0];
    if (!home) {
      return res.redirect("/home-list");
    }
    res.render("store/home-details", {
      home: home,
      pageTitle: "airbnb Home Details",
      currentPage: "Home Details",
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
  Favourite.getAllFavourites((favouriteIds) => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favouriteIds.includes(home.id)
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "airbnb Favourite List",
        currentPage: "FavouriteList",
      });
    });
  });
};

exports.postAddToFavourite = (req, res) => {
  const { homeId } = req.body;
  Favourite.addToFavourite(homeId, () => {
    res.redirect("/favourite-list");
  });
};

exports.postDeleteFromFavourite = (req, res) => {
  const { homeId } = req.params;
  Favourite.deleteById(homeId).then(() => {
    res.redirect("/favourite-list");
  });
};

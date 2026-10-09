const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Index",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.getHomes = (req, res) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((row) => {
    const home = row;
    if (!home) {
      return res.redirect("/home-list");
    }
    res.render("store/home-details", {
      home: home,
      pageTitle: "airbnb Home Details",
      currentPage: "Home Details",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "airbnb Bookings",
    currentPage: "Bookings",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.getFavouriteList = (req, res) => {
  Favourite.find()
    .populate("homeId")
    .then((favouriteDocs) => {
      const favouriteHomes = favouriteDocs.map((favourite) => favourite.homeId);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "airbnb Favourite List",
        currentPage: "FavouriteList",
        isLoggedIn: req.session.isLoggedIn,
      });
    });
};

exports.postAddToFavourite = (req, res) => {
  const { homeId } = req.body;
  Favourite.findOne({ homeId: homeId })
    .then((existingFavourite) => {
      if (!existingFavourite) {
        const favourite = new Favourite({ homeId: homeId });
        favourite
          .save()
          .then((result) => {})
          .catch((err) => {
            console.error("Error adding to favourites", err);
          });
      }
    })
    .finally(() => {
      res.redirect("/favourite-list");
    });
};

exports.postDeleteFromFavourite = (req, res) => {
  const { homeId } = req.params;
  Favourite.findOneAndDelete({ homeId: homeId }).then(() => {
    res.redirect("/favourite-list");
  });
};

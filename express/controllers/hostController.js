const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to Airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.getEditHome = (req, res, next) => {
  const { homeId } = req.params;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((row) => {
    const home = row;
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      pageTitle: "Edit Home",
      currentPage: "HostHomes",
      home: home,
      editing: editing,
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.getHostHomes = (req, res) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes",
      currentPage: "HostHomes",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photourl, description } =
    req.body;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photourl,
    description,
  });
  home.save().then(() => {
    res.redirect("/host/host-home-list");
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photourl, description } =
    req.body;
  Home.findById(id)
    .then((row) => {
      const updatedHome = row;
      updatedHome.houseName = houseName;
      updatedHome.price = price;
      updatedHome.location = location;
      updatedHome.rating = rating;
      updatedHome.photourl = photourl;
      updatedHome.description = description;

      updatedHome
        .save()
        .then(() => {})
        .catch((err) => {
          console.error("Error updating home:", err);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.error("Error finding home:", err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const { homeId } = req.params;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.error("Error deleting home:", err);
      res.redirect("/host/host-home-list");
    });
};

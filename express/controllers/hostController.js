const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to Airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const { homeId } = req.params;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(([rows]) => {
    const home = rows[0];
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      pageTitle: "Edit Home",
      currentPage: "HostHomes",
      home: home,
      editing: editing,
    });
  });
};

exports.getHostHomes = (req, res) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes",
      currentPage: "HostHomes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photourl, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photourl,
    description,
  );
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photourl, description } =
    req.body;
  const updatedHome = new Home(
    houseName,
    price,
    location,
    rating,
    photourl,
    description,
    id,
  );
  updatedHome.save();

  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const { homeId } = req.params;
    Home.delete(homeId).then(() => {
      res.redirect("/host/host-home-list");
    }).catch((err) => {
      console.error("Error deleting home:", err);
      res.redirect("/host/host-home-list");
    });
};

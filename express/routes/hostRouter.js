// External Module
const express = require("express");
const hostRouter = express.Router();

const registeredHomes = [];

function renderAddHome(res, { errors = [], values = {} } = {}, status = 200) {
  res.status(status).render("addHome", {
    pageTitle: "Add Home to Airbnb",
    currentPage: "addHome",
    errors,
    values,
  });
}

hostRouter.get("/add-home", (req, res) => {
  renderAddHome(res);
});

hostRouter.get("/home-added", (req, res) => {
  res.render("homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
});

hostRouter.post("/add-home", (req, res) => {
  const values = {
    houseName: req.body.houseName?.trim() ?? "",
    price: req.body.price?.trim() ?? "",
    location: req.body.location?.trim() ?? "",
    rating: req.body.rating?.trim() ?? "",
    photoUrl: req.body.photoUrl?.trim() ?? "",
  };
  const errors = [];
  const price = Number(values.price);
  const rating = Number(values.rating);

  if (!values.houseName) errors.push("A house name is required.");
  if (!values.location) errors.push("A location is required.");
  if (!values.price || !Number.isFinite(price) || price <= 0) {
    errors.push("Price must be a number greater than 0.");
  }
  if (
    values.rating === "" ||
    !Number.isFinite(rating) ||
    rating < 0 ||
    rating > 5
  ) {
    errors.push("Rating must be a number from 0 to 5.");
  }

  let photoUrl;
  try {
    photoUrl = new URL(values.photoUrl);
    if (!["http:", "https:"].includes(photoUrl.protocol)) {
      errors.push("Photo URL must begin with http:// or https://.");
    }
  } catch {
    errors.push("Enter a valid photo URL.");
  }

  if (errors.length > 0) {
    return renderAddHome(res, { errors, values }, 400);
  }

  registeredHomes.push({
    houseName: values.houseName,
    price,
    location: values.location,
    rating,
    photoUrl: photoUrl.href,
  });

  return res.redirect("/host/home-added");
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;

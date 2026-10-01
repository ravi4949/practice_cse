const path = require('path');

const express = require('express');

const contactRoute = express.Router();
const root = require('../utils/pathutils')

contactRoute.get("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for GET", req.url, req.method);
  res.sendFile(path.join(root,'views','contact.html'));
});

contactRoute.post("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for POST", req.url, req.method, req.body);
  res.send(`<h1>We will contact you shortly</h1>`);
});


module.exports = contactRoute;


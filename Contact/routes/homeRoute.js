const path = require('path');

const express = require('express');


const homeRoute = express.Router();
const root = require('../utils/pathutils')

homeRoute.get("/", (req, res, next) => {
  console.log("Handling / for GET", req.url, req.method);
  res.sendFile(path.join(root,'views','home.html'));
});

module.exports = homeRoute;

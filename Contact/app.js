// External Module
const path = require('path');
const express = require('express');

const app = express();
const homeRoute = require('./routes/homeRoute');
const contactRoute = require('./routes/contactRoute');

const root = require('./utils/pathutils');


app.use((req, res, next) => {
  console.log("First Dummy Middleware", req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(homeRoute);
app.use(contactRoute);

app.use((req,res,next) => {
  res.status(404).sendFile(path.join(root,'views','error.html'))
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
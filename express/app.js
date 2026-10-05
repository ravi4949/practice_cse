// Core Module
const path = require("path");

// External Module
const express = require("express");
//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const { get404 } = require("./controllers/error");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(get404);

const PORT = 3000;


mongoose.connect(
  "mongodb://purohitraveendra5_db_user:Dm7UHRy1KaIaSbcX@ac-wekbjlu-shard-00-00.azsc70b.mongodb.net:27017,ac-wekbjlu-shard-00-01.azsc70b.mongodb.net:27017,ac-wekbjlu-shard-00-02.azsc70b.mongodb.net:27017/airbnb?ssl=true&replicaSet=atlas-bhtxot-shard-0&authSource=admin&appName=Cluster00",
).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});
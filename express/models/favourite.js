const fs = require("fs"); 
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourites.json");
module.exports = class Favourite {

  static addToFavourite(homeId, callback) {
    Favourite.getAllFavourites((favourites) => {
      if (!favourites.includes(homeId)) {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites),callback);
      } else {
        console.log("Home is already in the favourite list.");
        callback();
      }
    });
  }

  static getAllFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      const favourites = !err ? JSON.parse(data) : [];
      callback(favourites);
    });
  }
};

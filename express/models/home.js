const fs = require("fs"); 
const path = require("path");
const rootDir = require("../utils/pathUtil");


module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.id = Math.random().toString(36); // Generate a random ID
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
      if (err) {
        console.error("Error writing home data to file:", err);
      }
    });
  });
  }

  static findById(homeId, callback) {
    Home.fetchAll((registeredHomes) => {
      const home = registeredHomes.find((h) => h.id === homeId);
      callback(home);
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    }); 
  }; 
}


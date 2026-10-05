const mongoose = require("mongoose");
const Favourite = require("./favourite");

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photourl:String,
  description: {
    type: String,
  },
});

homeSchema.pre("findOneAndDelete", async function() {
  const homeId = this.getQuery()._id;
  await Favourite.deleteMany({homeId: homeId});
});

module.exports = mongoose.model("Home", homeSchema);
const mongoose = require("mongoose");

const storesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  url: {
    type: String,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    min: 2,
  },
  adress: {
    type: Object,
  },
});

module.exports = mongoose.model("Stores", storesSchema);

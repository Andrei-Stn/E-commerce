const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  price: {
    type: String,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    min: 2,
  },
  id_shop: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);

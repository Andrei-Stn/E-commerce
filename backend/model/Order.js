const mongoose = require("mongoose");
const Item = require("./Item").schema;

const orderSchema = new mongoose.Schema({
  order: {
    type: [Item],
  },
  orderStatus: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);

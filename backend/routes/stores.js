const router = require("express").Router();
const Stores = require("../model/Stores");

router.get("/stores", async (req, res) => {
  const stores = await Stores.find();
  res.send(stores);
});

module.exports = router;

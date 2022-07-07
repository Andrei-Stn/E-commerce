const router = require("express").Router();
const Item = require("../model/Item");

router.post("/item", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    id_shop: req.body.id_shop,
    quantity: req.body.quantity,
    quantity_store: req.body.quantity_store,
    url: req.body.url,
  });
  try {
    const savedItem = await item.save();
    res.send(savedItem);
  } catch (err) {
    res.send(400).send(err);
  }
});

router.get("/item", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

module.exports = router;

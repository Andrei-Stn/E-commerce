const router = require("express").Router();
const Order = require("../model/Order");

router.post("/order", async (req, res) => {
  const order = new Order({
    order: req.body.order,
    orderStatus: "pending",
  });
  try {
    const savedOrder = await order.save();
    res.send(savedOrder);
  } catch (err) {
    res.send(400).send(err);
  }
});

router.get("/order", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

module.exports = router;

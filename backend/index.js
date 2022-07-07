const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const PATH =
  "mongodb+srv://admin:admin@cluster0.oqpwt.mongodb.net/<dbname>?retryWrites=true&w=majority";

//Import Routes
const authRoute = require("./routes/auth");
const itemRoute = require("./routes/items");
const storesRoute = require("./routes/stores");
const ordersRoute = require("./routes/orders");
dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db")
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/stores", itemRoute);
app.use("/api/stores", storesRoute);
app.use("/api/stores", ordersRoute);

app.listen(3000, () => console.log("Server Up and running"));

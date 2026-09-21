//load enviroment variable
require("dotenv").config();

//Import libraries
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Import
const connectDb = require("./config/db");
const authRoute = require("./routes/auth.route");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");

//express app
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  return res.send("Hello Charlie");
});

//endpoints
app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/products", productRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening at the port ${PORT}`);
  });
});

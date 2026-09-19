require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/auth.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8000;

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

app.use("/auth", authRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening at the port ${PORT}`);
  });
});

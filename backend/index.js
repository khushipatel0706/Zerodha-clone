const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const isProd = process.env.NODE_ENV === "production";

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
  maxAge: 3 * 24 * 60 * 60 * 1000,
};

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, email, password: hashed });

    res.cookie("token", createToken(user._id), cookieOptions);
    res.status(201).json({ success: true, message: "Signed up" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({ success: false, message: "Incorrect email or password" });
    }
    res.cookie("token", createToken(user._id), cookieOptions);
    res.json({ success: true, message: "Logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/verify", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ status: false });
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(data.id);
    if (!user) return res.json({ status: false });
    res.json({ status: true, user: user.username });
  } catch (err) {
    res.json({ status: false });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: isProd, sameSite: "lax" });
  res.json({ success: true });
});

app.get("/addHoldings", async (req, res) => {
  const count = await HoldingsModel.countDocuments();
  if (count > 0) return res.send("Holdings already exist, nothing added.");

  const tempHoldings = [
    { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
    { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
    { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
    { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
    { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
    { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
    { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
    { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
    { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
    { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
    { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
    { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
    { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
  ];

  await HoldingsModel.insertMany(tempHoldings);
  res.send("Holdings added!");
});

app.get("/addPositions", async (req, res) => {
  const count = await PositionsModel.countDocuments();
  if (count > 0) return res.send("Positions already exist, nothing added.");

  const tempPositions = [
    { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
    { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
  ];

  await PositionsModel.insertMany(tempPositions);
  res.send("Positions added!");
});

app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  const newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  await newOrder.save();
  res.send("Order saved!");
});

/* ---- Serve the built dashboard and frontend (used on Render) ---- */

const dashboardBuild = path.join(__dirname, "../dashboard/build");
const frontendBuild = path.join(__dirname, "../frontend/build");

app.use("/dashboard", express.static(dashboardBuild));
app.use("/dashboard", (req, res) =>
  res.sendFile(path.join(dashboardBuild, "index.html"))
);

app.use(express.static(frontendBuild));
app.use((req, res) => res.sendFile(path.join(frontendBuild, "index.html")));

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected!");
    app.listen(PORT, () => console.log("App started on port " + PORT));
  })
  .catch((err) => console.error("DB connection failed:", err.message));
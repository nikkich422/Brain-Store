const express = require("express");
const DB = require("./Db.js");
const myUser = require("./Model/User.Model.js");
const dist = require("../Backend/dist");
const cors = require("cors");

const userAddress = require("./Model/UserAddress.model.js");
const userPayment = require("./Model/User.Payment.model.js");
const Product = require("./Model/Product.model.js");

DB();
const PORT = 3000;
const app = express();
app.use(express.json());

app.use(cors());
app.get("/get", async (req, res) => {
  const allData = await User.find();
  res.status(200).json(allData);
});
app.use(express.static("dist"));
app.get("/user", async (req, res) => {
  const allData = await myUser.find();
  res.status(201).json(allData);
});
app.post("/user", async (req, res) => {
  const { _id, user_name, password, first_name, last_name, telephone } =
    req.body;
  const data = new myUser({
    _id,
    user_name,
    password,
    first_name,
    last_name,
    telephone,
  });
  await data.save();
  userRef_id = myUser.findById(req.body?._id);
  res
    .status(201)
    .json({ message: "your data insertedd successfully", data: data });
});

app.get("/userAddress", async (req, res) => {
  const allData = await userAddress.find();
  res.status(201).json(allData);
  console.log(allData);
});

app.post("/userAddress", async (req, res) => {
  const {
    user_id,
    city,
    country,
    pincode,
    telephone,
    address_one,
    mobile,
    address_two,
  } = req.body;
  const data = new userAddress({
    user_id,
    city,
    country,
    pincode,
    telephone,
    address_one,
    mobile,
    address_two,
  });
  await data.save();
  res
    .status(201)
    .json({ message: "your data insertedd successfully", data: data });
});

app.get("/userPayment", async (req, res) => {
  const allData = await userPayment.find();
  res.status(201).json(allData);
  console.log(allData);
});

app.post("/userPayment", async (req, res) => {
  const { user_id, account_no, payment_type, provider, expiry_data } = req.body;
  const data = new userPayment({
    user_id,
    account_no,
    payment_type,
    provider,
    expiry_data,
  });
  await data.save();
  res
    .status(201)
    .json({ message: "your data insertedd successfully", data: data });
});

app.get("/product", async (req, res) => {
  const allData = await Product.find();
  res.status(201).json(allData);
  console.log(allData);
});

app.post("/product", async (req, res) => {
  const {
    product_id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;
  const data = new Product({
    product_id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  });
  await data.save();
  res
    .status(201)
    .json({ message: "your data insertedd successfully", data: data });
});

app.post("/get", async (req, res) => {
  const { name, email } = req.body;
  const data = new User({ name, email });
  await data.save();
  res
    .status(201)
    .json({ message: "your data success full insert", Data: data });
});

app.put("/get", async (req, res) => {
  const todo = await User.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  const updatedTodo = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

app.listen(PORT, () => {
  console.log(`your server run port on ${PORT}`);
});

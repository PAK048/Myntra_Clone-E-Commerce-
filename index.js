require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const server = express();
const productRouter = express.Router();
const userRouter = express.Router();

// Database connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is Connected!");
  } catch (err) {
    console.error(err);
  }
}
main();

// Middleware
server.use(cors());
server.use(express.json());

// Routes
server.use("/products", productRouter);
server.use("/users", userRouter);

// Products CRUD
const productController = require("./controller/product");
productRouter
  .post("/", productController.createProduct)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

// Users CRUD
const userController = require("./controller/users");
userRouter
  .post("/", userController.createUser)
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUser)
  .put("/:id", userController.replaceUser)
  .patch("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

// Serve static files
server.use(express.static(path.resolve(__dirname, "dist")));

// Catch-all handler to serve React app for any unknown route
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Start server
server.listen(process.env.PORT, () => {
  console.log("Server started at PORT:", process.env.PORT);
});

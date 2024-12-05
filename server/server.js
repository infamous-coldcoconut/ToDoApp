import express from "express";
import cors from "cors";
import shoppingListRoutes from "./src/routes/shoppingList.route.js";
import itemRoutes from "./src/routes/item.route.js";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 5050;
const CONNECTION = process.env.CONNECTION;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/shoppingList", shoppingListRoutes);
app.use("/itemRoutes", itemRoutes);

app.get("/test", (req, res) => {
  res.send("API is running...");
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();

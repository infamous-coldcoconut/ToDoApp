import express from "express";
import cors from "cors";
import shoppingListRoutes from "./src/routes/shoppingList.route.js";
import userRoutes from "./src/routes/user.route.js";
import itemRoutes from "./src/routes/item.route.js";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 5050;
const CONNECTION = process.env.CONNECTION;

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // React app's URL
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.use(express.json());

app.use("/shoppingList", shoppingListRoutes);
app.use("/shoppingList", itemRoutes);
app.use("/user", userRoutes);

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

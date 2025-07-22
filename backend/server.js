import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});



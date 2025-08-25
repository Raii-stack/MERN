import express from "express";
import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.routes.js"; // TEMPORARILY COMMENTED OUT
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());

// app.use("/api/products", productRoutes); // TEMPORARILY COMMENTED OUT

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});

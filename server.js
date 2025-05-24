const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://zxrty721:KD5fljPJPg7TOgq0@cluster0.gwizz1y.mongodb.net/database?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

  
app.get("/", (req, res) => {
  res.send("Web API is running!");
});

app.get("/items", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    console.log(db.databaseName)
    const items = await db.collection("items").find({}).toArray();

    console.log("📦 Items:", items); 
    res.json(items);
  } catch (err) {
    console.error("❌ /items error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const port = 3000;
app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));
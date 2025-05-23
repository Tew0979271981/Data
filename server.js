const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://zxrty721:KD5fljPJPg7TOgq0@cluster0.gwizz1y.mongodb.net/";
mongoose.connect(uri).then(() => console.log("✅ Connected to MongoDB"));

app.get("/", (req, res) => {
  res.send("Web API is running!");
});

// ✅ ตัวอย่าง route เชื่อม MongoDB
app.get("/users", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("✅ Server started on port", port));

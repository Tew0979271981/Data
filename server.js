const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://zxrty721:KD5fljPJPg7TOgq0@cluster0.gwizz1y.mongodb.net/";

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err.message));

app.get("/", (req, res) => {
  res.send("Web API is running!");
});

app.get("/users", async (req, res) => {
  console.log("✅ /users route called");

  try {
    const db = mongoose.connection.db;
    const users = await db.collection("users").find({}).toArray();
    console.log("✅ Users:", users);
    res.json(users);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server listening on port ${port}`));
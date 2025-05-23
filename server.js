const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://zxrty721:KD5fljPJPg7TOgq0@cluster0.gwizz1y.mongodb.net/";
mongoose.connect(uri).then(() => console.log("MongoDB connected"));

app.get("/", (req, res) => {
  res.send("Web API is running!");
});

app.get("/test", async (req, res) => {
  const db = mongoose.connection.db;
  const result = await db.collection("users").findOne({});
  res.json(result);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is running on port", port));

import express from "express";
import devBundle from "./devBundle";
import path from "path";
import template from "./../template";
import { MongoClient } from "mongodb";

const app = express();

let port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).send(template());
});

app.use("/dist", express.static(path.join(__dirname, "dist")));

devBundle.compile(app);

// Database Connection URl
const url =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";

MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server");

  db.close();
});

const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/contactDance");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const port = 8000;

//define mongoose schema
const contactschema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  desc: String,
});
const contact = mongoose.model("contact", contactschema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.get("/about", (req, res) => {
  const params = {};
  res.status(200).render("about.pug", params);
});

app.get("/styles", (req, res) => {
  const params = {};
  res.status(200).render("styles.pug", params);
});

app.get("/reviews", (req, res) => {
  const params = {};
  res.status(200).render("reviews.pug", params);
});

app.post("/contact", (req, res) => {
  var mydata = new contact(req.body);
  mydata
    .save()
    .then(() => {
      res.send("this item has been saved to the database");
      // agar alert box use karna he instead of this item has been saved to the databse then ull have to use bootstrap
    })
    .catch(() => {
      res.status(400).send("item was not saved to the database");
    });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

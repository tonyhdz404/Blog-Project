const express = require("express");
const mongoose = require("mongoose");
const app = express();
const articleRouter = require("./routes/articles");
const Author = require("./models/article");

//* Connecting to Mongoose
//? Here we set up the connection by passing in out ip address NOT localhost and the the name of our database
mongoose.connect("mongodb://127.0.0.1:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//* Testing Connection
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use(express.urlencoded({ extended: false }));
//* Setting up our View Engine
app.set("view engine", "ejs");

//* Mounting Our Routers
app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Author.find();
  res.render("articles/index", { articles: articles });
});

app.listen(7000, () => {
  console.log(`Server Running on Port: 7000`);
});

// const articles = [
//   {
//     title: "Test Article",
//     createdAt: new Date(Date.now()).toLocaleDateString(),
//     summary:
//       "The Bulldog, also known as the English Bulldog or British Bulldog, is a medium-sized dog breed. It is a muscular, hefty dog with a wrinkled face and a distinctive pushed-in nose. The Kennel Club, the American Kennel Club, and the United Kennel Club oversee breeding records.",
//   },
//   {
//     title: "Test Article 2",
//     createdAt: new Date(Date.now()).toLocaleDateString(),
//     summary:
//       "The Chihuahua is one of the smallest breeds of dog, and is named after the Mexican state of Chihuahua.",
//   },
// ];

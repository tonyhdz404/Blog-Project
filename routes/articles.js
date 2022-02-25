const express = require("express");
const router = express.Router();
const Article = require("./../models/article");

//* This endpoint goes to the form page Where we gather all the info for a new Blog
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

//* Shows a single Blog
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article === null) {
    res.redirect("/");
  }
  res.render("articles/show", { article: article });
});
//* When we hit SUBMIT on oue from this handles the post request and creates a new article instance with all the gathered info. And then redirects to that articles show page
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
    createdAt: req.body.createdAt,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    console.log(error);
    res.render("articles/new", {
      article: article,
      errorMsg: "Error Creating Blog Post",
    });
  }
});

module.exports = router;

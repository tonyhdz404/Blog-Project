const express = require("express");
const article = require("./../models/article");
const router = express.Router();
const Article = require("./../models/article");

//* This endpoint goes to the form page Where we gather all the info for a new Blog
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  let article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;

    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    article.createdAt = req.body.createdAt;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      console.log(error);
      res.render(`articles/${path}`, {
        article: article,
        errorMsg: "Error Creating Blog Post",
      });
    }
  };
}

//* Shows a single Blog
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article === null) {
    res.redirect("/");
  }
  res.render("articles/show", { article: article });
});
//* When we hit SUBMIT on oue from this handles the post request and creates a new article instance with all the gathered info. And then redirects to that articles show page
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect(`/articles/${article.slug}`)
);

router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.redirect(`/articles/${article.slug}`);
  }
});
module.exports = router;

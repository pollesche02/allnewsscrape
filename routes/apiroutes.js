var db = require("../models");
var cheerio = require("cheerio");
var axios = require("axios");
function apiroutes(app) {
  app.get("/", function (req,res) {
    res.render("index");
  });
  app.get("/scrape", function (req, res) {
    axios
      .get("https://www.news18.com/newstopics/baking.html")
      .then(function (results) {
        //    console.log(results)
        var $ = cheerio.load(results.data);
        var newsarray = [];
        $("div.search-listing  ul li").each(function (i, element) {
          var title = $(this).children("h2").children("a").text();
          var summary = $(this).children("p").children("a").text();
          var link = $(this).children("a").attr("href");
          var image = $(this).children("a").children("img").attr("src");

          console.log(title, summary, link, image);

          db.Article.create({
            Headline: title,
            Summary: summary,
            URL: link,
            Image: image,
          }).then(function (data) {
            res.send("scrape is completed");
          });
        });
      });
  });

  // app.get("/", function (req,res) {
  //   res.render("index");
  // });


  app.get("/all", function (req, res) {
    db.allnewsscrape.find({}, function (err, found) {
      if (err) {
        console.log(err)
      } else {
        res.json(found)
      }
    });
  });

  app.get("/title", function(req, res) {
    db.allnewsscrape.find().sort({ title: 1 }, function(error, found) {
      if (error) {
        console.log(error);
      }
      else {
        res.send(found);
      }
    });
  });
}
module.exports = apiroutes;

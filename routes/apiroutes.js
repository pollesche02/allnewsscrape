var db = require("../models");
var cheerio = require("cheerio");
var axios = require("axios");

function apiroutes(app) {
  
  app.get("/", function (req,res) {
    console.log("GET....")
    db.Article.find({})
    .then(function(dbArticle) {
      console.log(dbArticle)
      var articles = dbARticle.map(elem => {
        return {
          Headline: elem.Headline,
          Summary: elem.Summary,
          URL: elem.URL,
          Image: elem.Image
        }
      })
      var hbsObject = {
        articles: articles
      }
      console.log("................hbsObject")
      console.log(hbsObject)
      res.render("index", hbsObject);
    })
  });
    
  app.get("/scrape", function (req, res) {
    console.log("scrape")
    axios
      .get("https://www.news18.com/newstopics/baking.html")
      .then(function (results) {
        //    console.log(results)
        var $ = cheerio.load(results.data);
        var newsarray = [];
        $("div.search-listing  ul li").each(function (i, element) {
          var title = $(this).find("h2").children().text();
          var summary = $(this).find("p").children().text();
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

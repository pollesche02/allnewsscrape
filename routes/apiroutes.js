var db = require("../models");
var cheerio = require("cheerio");
var axios = require("axios");
function apiroutes(app) {
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
}
module.exports = apiroutes;

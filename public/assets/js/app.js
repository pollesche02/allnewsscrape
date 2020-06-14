// CREATE A FUNCTION THAT WILL DISPLAY ALL MY RESULTS
// GET ALL INFORMATION AND APPEND IT INTO THE TABLE THAT WAS CREATED IN INDEX.HANDLEBARS

$.getJSON("/all", function(data){
    for (var i = 0; i < data.length; i++){
        $("#results").append("<tr><td>" + data[i].title + "</td>" + 
        "<td>" + data[i].summary +"<td><a href='" + data[i].link + "'>" + data[i].link + "</a></td>"
         + "<td><img src='" + data[i].image +  " '/></td>" + "</td></tr>");
    }
});

function setActive(selector) {
    $("th").removeClass("active");
    $(selector).addClass("active");
}

$("#headline-sort").on("click", function(){
    $("#tableBody").empty();
    setActive("#title");
  
    $.getJSON("/title", function(data){
      console.log(data);
      for (var i = 0; i < data.length; i ++) {
        $("#tableBody").append(("<tr><td>" + data[i].title + "</td>" + 
        "<td>" + data[i].summary +"<td><a href='" + data[i].link + "'>" + data[i].link + "</a></td>"
         + "<td><img src='" + data[i].image +  " '/></td>" + "</td></tr>"));
      };
    });
  
  });
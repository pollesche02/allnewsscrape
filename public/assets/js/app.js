

// CREATE A FUNCTION THAT WILL DISPLAY ALL MY RESULTS
// GET ALL INFORMATION AND APPEND IT INTO THE TABLE THAT WAS CREATED IN INDEX.HANDLEBARS

$(".savebtn").on("click", function (){
  var id = $(this).attr("data-id")
  $.ajax({
    url: "/api/articles/" + id,
    method: "PUT"
  }).then(function(data){
    location.reload()
  })
})

$(".deletebtn").on("click", function (){
  var id = $(this).attr("data-id")
  $.ajax({
    url: "/api/articles/" + id,
    method: "DELETE"
  }).then(function(data){
    location.reload()
  })
})



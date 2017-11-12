/* $(document).ready(function(){
  attachListeners()
})
*/
//function moreInfo(element){
//  var id = parseInt(element.dataset.id)
//  const nextId = id + 1
  //const id = parseInt($(".js-next").attr("data-id"))
  //const nextId = id + 1
//  $.get('/trips/' + nextId + '.json', function(data){
//    var categories= data["categories"]
//    var catList = ""
//    for (var i = 0; i < categories.length; i++){
//      catList += "<li>" + categories[i]["name"] + " " + "</li>"
  //  }
//    $("#tripCatShow-" +id).html(catList)
//  })
//  $("#more-" + id + "-trip").replaceWith(`<button id="hide-${id}-trip" class="js-hide" data-id="${id}" onClick= hideInfo(this)>Hide</button>`)
//}

$(function() {
  $("a.load_categories").on("click", function(e) {
    const id = parseInt($(".load_categories").attr("data-id"))
    $.get("/trips/" + id + "/categories" + '.json', function(data) {
      var catsList = "<p>"
      for (var i = 0; i < data.length; i++){
        catsList += " " + data[i]["name"] + " " + "|"
      }
      catsList += "</p>"
      $(".categories").html(catsList)
    });
    $("a.load_categories").attr("href", "");
    //$(".load_categories").replaceWith(`<a href="#" class="load_categories"
    // data-id="${this.id}" onClick=hideCategories(this)>Hide Categories</a>`)
    e.preventDefault();
  })
})

//function hideCategories(element){
//  var id = element.dataset.id
//  $(".load_categories").html("")
//  $(".hide_button").replaceWith(`<a href="/trips/${this.id}/categories" class="load_categories"
//   data-id="${this.id}">See Categories</a>`)
//}


$(function() {
  $('.js-next').on('click', function() {
    const currentId = parseInt($(".js-next").attr("data-id"))
    const nextId = currentId + 1;
    $.get("/trips/" + nextId + ".json", function(tripJSON) {
      const trip = new Trip(tripJSON);
      trip.renderNext()
    })
    $(".comments").html("")
    $(".newComment").html("")
    $(".js-next").attr("data-id", nextId)
    $(".tripName").attr("href", `/trips/${nextId}`)
    // change href of "See The Comments"
   $(".load_categories").attr("href", `${nextId}/categories`)
   // change action of New Comment form
   const newAction = $(".new_comment").attr("action").replace(currentId, nextId)
   $(".new_comment").attr("action", newAction)
  })
})

// JS Constructor - create object
function Trip(attributes) {
  this.id = attributes.id
  this.name = attributes.name
  this.categories = attributes.categories
  this.content = attributes.content
  this.user = attributes.user
}
// Prototype methods
Trip.prototype.formatLink = function() {
  let tripHTML = `<a href="/trips/${this.id}" data-id=${this.id}>${this.name}</a><br>`
  return tripHTML
}

function parseJson(object){
    object.forEach(function(key) {
      console.log(key.name);
      return `Name: ${key.name}`
    });
}

Trip.prototype.renderNext = function() {
  //let categoriesNames = jQuery.each(this.categories, function(i, val) {
  //  $("#" + i).append(document.createTextNode(" - " + val));
//  });
  let categoriesNames = parseJson(this.categories);

	$(".tripName").text(this.name)
	//$(".tripCategories").text(categoriesNames)
	$(".tripContent").text(this.content)
	$(".tripUser").text(this.user.name)
  $(".user_link").attr("href", `/users/${this.user.id}`)
  $(".edit_trip").attr("href", `/trips/${this.id}/edit`)
  $(".delete_trip").attr("href", `/trips/${this.id}`)
  $(".load_comments").attr("href", `/trips/${this.id}/comments`)
  $(".comments").html("")
  $(".load_categories").attr("href", `/trips/${this.id}/categories`)
  $(".categories").html("")
}

$(function() {
  $("a.load_comments").on("click", function(e) {
    const id = parseInt($(".load_comments").attr("data-id"))
    $.get("/trips/" + id + "/comments" + '.json', function (comments) {
      comments.forEach(function(comment) {
        const oneComment = new Comment(comment)
        const commentHTML = oneComment.formatComment()
        $(".comments").append(commentHTML)
      })
    });
    //to prevent multiple renderings on recipe show page
    $("a.load_comments").attr("href", "");
    $(".load_comments").replaceWith(`<a href="#" class="load_comments"
     data-id="${this.id}" onClick=hideComments(this)>Hide Comments</a>`)
    e.preventDefault();
  })
})

function hideComments(element){
  var id = element.dataset.id
  $(".load_comments").html("")
  $(".hide_button").replaceWith(`<a href="/trips/${this.id}/comments" class="load_comments"
   data-id="${this.id}">See Comments</a>`)
}

// JS Constructor - creates an Comment object
function Comment(comment) {
  this.id = comment.id
  this.text = comment.text
  this.trip = comment.trip
}
// Prototype method
Comment.prototype.formatComment = function() {
  commentHTML = `<li data-id=${this.id}><b>${this.trip.name}:</b> ${this.text} <em class="delete-comment" data=${this.id}>Delete</em> </li>`
  return commentHTML
}

// Submitting Comment via Rails API
$(function() {
  $(".new_comment").on("submit", function(e){
    $.post(this.action, $(this).serialize(), function(comment) {
      if (Array.isArray(comment)) {
        var message = "";
        comment.forEach(function(error) {
          message += `${error}\n`
        })
        alert(message);
      } else {
        const $ol = $(".newComment");
        const newComment = new Comment(comment);
        const commentHTML = newComment.formatComment();
        $ol.append(commentHTML);
      }
      // empty fields
      $("#comment_text").val("");
    });
    e.preventDefault();
    })
 })

 $(function() {
   $(".delete_comment").on("click", function(e){
   var commentId = element.attributes["data"].value
  $.ajax({
    url: '/comments/' +commentId,
    type: 'DELETE',
    success: function(result){
      $("#comment-"+result["id"]).replaceWith("")
    }
  })
  e.preventDefault();
})
})

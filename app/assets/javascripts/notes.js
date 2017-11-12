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
    $(".js-next").attr("data-id", nextId)
    $(".tripName").attr("href", `/trips/${nextId}`)
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
	$(".tripCategories").text(categoriesNames)
	$(".tripContent").text(this.content)
	$(".tripUser").text(this.user.name)
  $(".user_link").attr("href", `/users/${this.user.id}`)
  $(".edit_trip").attr("href", `/trips/${this.id}/edit`)
  $(".delete_trip").attr("href", `/trips/${this.id}`)
  $(".load_categories").attr("href", `/trips/${this.id}/categories`)
  $(".categories").html("")
}

$(function() {
    $('.new_category').submit(function(event) {
      event.preventDefault();
      var values = $(this).serialize();
      var posting = $.post('/trip', values);
      posting.done(function(data) {
        var category = data;
        $("#categorytName").text(category["name"]);
      });
    });
  });

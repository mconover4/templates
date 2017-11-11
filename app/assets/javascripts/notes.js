function moreInfo(element){
  var id = element.dataset.id
  $.get('/trips/' + id + '.json', function(data){
    var categories= data["categories"]
    var catList = ""
    for (var i = 0; i < categories.length; i++){
      catList += "<li>" + "<b>" + "Name:" + "</b>" + " " + categories[i]["name"] + " " + "|" + "</li>"
    }
    $("#tripCatShow-" +id).html(catList)
  })
  $("#more-" + id + "-trip").replaceWith(`<button id="hide-${id}-trip" class="js-hide" data-id="${id}" onClick= hideInfo(this)>Hide</button>`)
}

function hideInfo(element){
  var id = element.dataset.id
  $("#tripCatShow-"+id).html("")
  $(`#hide-${id}-trip`).replaceWith(`<button id="more-${id}-trip"
  class="js-more" data-id="${id}" onclick="moreInfo(this)">Show Categories</button>`)
}


$(function() {
  $('.js-next').on('click', function() {
    const currentId = parseInt($(".js-next").attr("data-id"))
    const nextId = currentId + 1;
    $.get("/trips/" + nextId + ".json", function(tripJSON) {
      const trip = new Trip(tripJSON);
      trip.renderNext()
    })

    $(".js-next").attr("data-id", nextId)

    // change href of tripName
    $(".tripName").attr("href", `/trips/${nextId}`)


    // change href of "Edit Trip"
    //const newHref = $(".edit_trip").attr("href", `/trips/${nextId}/edit`)
  })
})

// JS Constructor - creates a Recipe object
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

}

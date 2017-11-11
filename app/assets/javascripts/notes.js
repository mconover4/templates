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
    $(".edit_trip").attr("href", `/trips/${nextId}/edit`)
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

}

//$(document).ready(function(){
//  attachListeners()
//})

//function moreInfo(element){}
//function hideInfo(element){}
//function nextTrip(){}

//Sift Through Trips
$(function() {
  $('.js-next').on('click', function() {
    const currentId = parseInt($(".js-next").attr("data-id"))
    const nextId = currentId + 1;
    $.get("/trips/" + nextId + ".json", function(tripJSON) {
      const trip = new Trip(tripJSON);
      trip.renderNext()
    })

    //empty previous trip's items, old + new
    $(".items").html("")
    $(".newItem").html("")

    // change attribute to sift to next trip
    $(".js-next").attr("data-id", nextId)

    // change href of tripName
    $(".tripName").attr("href", `/trip/${nextId}`)

    // change href of "Edit Trip"
    const newHref = $(".edit_trip").attr("href").replace(currentId, nextId)
    $(".edit_trip").attr("href", newHref)
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

Trip.prototype.renderNext = function() {
	$(".tripName").text(this.name)
	$(".tripCategories").text(this.categories)
	$(".tripContent").text(this.content)
	$(".tripUser").text(this.user.name)
}

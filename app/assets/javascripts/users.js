// Show User Trips
function showTrips(element){
  var id = element.dataset.id
  $.get('/users/' + id + '/trips' +'.json', function(trips) {

    var infoList = trips
                    .sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase())
                    .map(attributes => new Trip(attributes).renderListItem())
                    .join('')
    $("#userShow-" +id).html(infoList)
  })
  $("#more-" + id + "-user").replaceWith(`<button id="hide-${id}-user" class="js-hide" data-id="${id}" onClick= hideInfo(this)> Hide Trips</button>`)
}

Trip.prototype.renderListItem = function() {
  return (`
    <li>
      <h4>Trip: <a href='/trips/${this.id}'> ${this.name} </a> </h4>
      <b>Categories:</b> ${this.categories[0].name}, ${this.categories[1].name}
      <br>
      <b>Content:</b> ${this.content}
    </li>
  `)
}

// Hide Trips
function hideInfo(element){
  var id = element.dataset.id
  $("#userShow-"+id).html("")
  $(`#hide-${id}-user`).replaceWith(`<button id="more-${id}-user"
  class="js-more" data-id="${id}" onclick="showTrips(this)">Show Trips</button>`)
}

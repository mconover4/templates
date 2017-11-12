function showTrips(element){
  var id = element.dataset.id
  $.get('/users/' + id + '/trips' +'.json', function(data){
    var trips = data
    var infoList = ""
    for (var i = 0; i < trips.length; i++){
      let tripLink = "/trips/trip[i]['id']"
      infoList += "<li>" + "<h4>" + "Title:" + " " + "<a href='${tripLink}'>" + trips[i]["name"] + "</a>" + "</h4>" + " " +
      "<b>" + " Categories:" + "</b>" + " " + trips[i]["categories"][0]["name"] + ", " + trips[i]["categories"][1]["name"] + "<br>" +
      "<b>" + " Content:" + "</b>" + " " + trips[i]["content"] + " " + "</li>"
    }
    $("#userShow-" +id).html(infoList)
  })
  $("#more-" + id + "-user").replaceWith(`<button id="hide-${id}-user" class="js-hide" data-id="${id}" onClick= hideInfo(this)> Hide Trips</button>`)
}

function hideInfo(element){
  var id = element.dataset.id
  $("#userShow-"+id).html("")
  $(`#hide-${id}-user`).replaceWith(`<button id="more-${id}-user"
  class="js-more" data-id="${id}" onclick="showTrips(this)">Show Trips</button>`)
}

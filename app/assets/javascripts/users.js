function moreInfo(element){
  var id = element.dataset.id
  $.get('/users/' + id + '.json', function(data){
    var trips = data["trips"]
    var infoList = ""
    for (var i = 0; i < trips.length; i++){
      infoList += "<li>" + "<b>" + "Name:" + "</b>" + " " + trips[i]["name"] + " " + "|" +
      "<b>" + " Description:" + "</b>" + " " + trips[i]["content"] + " " + "|" +
      "<b>" + " Categories:" + "</b>" + " " + trips[i]["categories"] + " " + "|" + "</li>"
    }
    $("#userShow-" +id).html(infoList)
  })
  $("#more-" + id + "-user").replaceWith(`<button id="hide-${id}-user" class="js-hide" data-id="${id}" onClick= hideInfo(this)> Hide Info</button>`)
}

function hideInfo(element){
  var id = element.dataset.id
  $("#userShow-"+id).html("")
  $(`#hide-${id}-user`).replaceWith(`<button id="more-${id}-user"
  class="js-more" data-id="${id}" onclick="moreInfo(this)">Show Trips</button>`)
}

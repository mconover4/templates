//$(function() {
//  $("a.load_categories").on("click", function(e) {
//    $.get(this.href, function (categories) {
//      categories.forEach(function(category) {
//        const oneCategory = new Category(category)
//        const categoryHTML = oneCategory.formatCategory()
//        $(".categories").append(categoryHTML)
//      })
//    });
    //to prevent multiple renderings on recipe show page
//    $("a.load_categories").attr("href", "");
//    e.preventDefault();
//  })
//})

// JS Constructor - creates an Category object
//function Category(category) {
//  this.id = category.id
//  this.name = category.name
//}
// Prototype method
//Category.prototype.formatCategory = function() {
//  categoryHTML = `<li data-id=${this.id}>${this.name}</li>`
//  return categoryHTML
//}
// Submitting Category via Rails API
//$(function() {
//  $(".new_category").on("submit", function(e){
//    $.post(this.action, $(this).serialize(), function(category) {
//      if (Array.isArray(category)) {
//        var message = "";
//        category.forEach(function(error) {
//          message += `${error}\n`
  //      })
    //    alert(message);
  //    } else {
  //      const $ol = $(".newCategory");
  //      const newCategory = new Category(category);
  //      const categoryHTML = newCategory.formatCategory();
  //      $ol.append(categoryHTML);
  //    }
      // empty fields
//      $("#category_name").val("");
//    });
//    e.preventDefault();
//  })
//})

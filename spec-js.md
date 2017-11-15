# Specifications for the Rails with jQuery Assessment

Specs:
- [x] Use jQuery for implementing new requirements
- [x] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend.
  In Trips/show, you can click "next" to render next Trip
- [x] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend.
  In Users/show, you can click "show trips" to render all user trips (and you can hide them)
- [x] Include at least one has_many relationship in information rendered via JSON and appended to the DOM.
  In Trips/Show, you can see its categories (with a many-to-many relationship) and you can click "show comments" to load them, also in Users/show for the user trips
- [x] Use your Rails API and a form to create a resource and render the response without a page refresh.
  in Trips/show, you can create a comment and see it without the page refreshing
- [x] Translate JSON responses into js model objects.
  Done when you use "Next trip" to render Trip
- [x] At least one of the js model objects must have at least one method added by your code to the prototype.
  The Trip model uses prototype property, same for the Comment model

Confirm
- [x] You have a large number of small Git commits
- [x] Your commit messages are meaningful
- [x] You made the changes in a commit that relate to the commit message
- [x] You don't include changes in a commit that aren't related to the commit message

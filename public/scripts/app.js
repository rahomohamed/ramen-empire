$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

  const createMenuItem = function(item) {
    console.log('created menu item')
    return`  <article class = "menu">
    <div class="item-image">
    <img class="ui medium circular image" src=${item.image}>
  </div>
<h4 class="ui dividing header">${item.price}</h4>
<button class="add ui blue button" tabindex="0">Add</button>
<button class="remove ui red button" tabindex="0">Remove</button>
<h3>${item.name}</h3>
<h4>${item.description}</h4>
  </article>`
    }

$(document).ready(function () {
  $(".addCart").click(function () {
    event.preventDefault();
    $(".newItem").append($(`<button class="add ui blue button" tabindex="0">+</button> <span id="counter">1</span> <button class="remove ui red button" tabindex="0">-</button>`));
    let totalPrice = $(".price").text()
    $(".totalPrice").text(`${totalPrice}`)
    $(".add").click(function () {
      event.preventDefault();
      let i = parseInt($("#counter").text());
      i++;
      $("#counter").text(i + "X BUCKET OF FRIED CHICKEN");
      let j = parseInt(totalPrice)
      $(".totalPrice").text(j * i)
    });
    $(".remove").click(function () {
      event.preventDefault();
      let i = parseInt($("#counter").text());
      if (i <= 0) {
        //some function to stop it/do nothing
        i === 0;
      } else {
        i--;
      };
      $("#counter").text(i + " X BUCKET OF FRIED CHICKEN");
      let j = parseInt(totalPrice)
      $(".totalPrice").text(j * i)
    });
  });
});






// function addOrder(orderName) ->
//   Orderelement {
//     <h4 class="ui dividing header">Order Summary</h4>
//     <button class="add ui blue button" tabindex="0">+</button>
//     <span id="counter">0</span>
//     <button class="remove ui red button" tabindex="0">-</button>
//   create outer div
//   return the outer div
// }

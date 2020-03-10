$(document).ready(function () {
  $(".addCart").click(function () {
    $(".addCart").addClass("disabled")
    event.preventDefault();
    $(".new-item").append($(`<button class="add ui blue button" tabindex="0">+</button> <span id="counter">1 X BUCKET OF FRIED CHICKEN</span> <button class="remove ui red button" tabindex="0">-</button>`));
    let preTax = $(".price").text().slice(1)
    $(".pre-tax").text(`Total Before Tax: $${preTax}`)
    //need to setTimeout to make these two appear
    // $(".tax-amount").text("13% HST: $" + (j * i * 0.13).toFixed(2))
    // $(".total-price").text("Total Amount: $" + (j * i * 1.13).toFixed(2))

    //need to put a cap on how many of one item can be ordered
    $(".add").click(function () {
      event.preventDefault();
      let i = parseInt($("#counter").text());
      i++;
      $("#counter").text(i + "X BUCKET OF FRIED CHICKEN");
      let j = parseFloat(preTax)
      $(".pre-tax").text("Total Before Tax: $" + (j * i).toFixed(2))
      $(".tax-amount").text("13% HST: $" + (j * i * 0.13).toFixed(2))
      $(".total-price").text("Total Amount: $" + (j * i * 1.13).toFixed(2))
    });
    $(".remove").click(function () {
      event.preventDefault();
      let i = parseInt($("#counter").text());
      if (i <= 0) {
        //some function to stop it/do nothing
        //need to make a full remove
        //is i === 0 necessary?
        i === 0;
        $(".addCart").removeClass("disabled")
      } else {
        i--;
      };
      $("#counter").text(i + " X BUCKET OF FRIED CHICKEN");
      let j = parseFloat(preTax)
      $(".pre-tax").text("Total Before Tax: $" + (j * i).toFixed(2))
      $(".tax-amount").text("13% HST: $" + (j * i * 0.13).toFixed(2))
      $(".total-price").text("Total Amount: $" + (j * i * 1.13).toFixed(2))
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

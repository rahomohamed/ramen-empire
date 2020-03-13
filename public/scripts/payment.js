//The Confirmation Page submit- cannot leave field empty and press submit otherwise alert message
let order = [];
let preTax = 0;
let tax = 0;
let grandTotal = 0;
$(document).ready(function() {


  //Get values from local storage
  order = JSON.parse(localStorage.getItem("order"));
  preTax = localStorage.getItem("preTax");
  tax = localStorage.getItem("tax");
  grandTotal = localStorage.getItem("grandTotal");


  const isEntryValid = entry => {
    if (entry === "") {
      return false;
    } else {
      return true;
    }
  };


  function createOrderHtml(item) {
    return `
    <h4>${item.name} X ${item.quantity}</h4>
    `;
  }

  function createPaymentSummaryHtml(order) {
    order.forEach((item)=> {
      $('#order-summary').find('#order').append(createOrderHtml(item));
    });
    const paymentHtml = `
    <h4 class="ui dividing header"><h4>Total before tax: $${preTax}.00</h4>
    <h4>Tax: $${tax}</h4>
    <h4>Total Amount: $${grandTotal}</h4>`;
    $('#order-summary').find('#payment').append(paymentHtml);
  }

  createPaymentSummaryHtml(order);
  //Target the submit button
  let form = $("#submit-button");
  form.click(function() {
    const name = $("#first-name").val();
    const lastName = $("#last-name").val();
    const phone = $("#phone-form").val();
    const address = $("#address").val();
    localStorage.setItem("address", address);
    const cardNumber = $("#card-number").val();
    const cardDate = $("#card-date").val();
    const cardCvv = $("#cvc").val();
    if (
      !isEntryValid(name) ||
      !isEntryValid(lastName) ||
      !isEntryValid(phone) ||
      !isEntryValid(address) ||
      !isEntryValid(cardNumber) ||
      !isEntryValid(cardDate) ||
      !isEntryValid(cardCvv)
    ) {
      event.preventDefault();
      alert(
        "You cannot leave a field empty, please fill out all the forms to proceed"
      );
    }
  });
});

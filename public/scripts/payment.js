//The Confirmation Page submit- cannot leave field empty and press submit otherwise alert message
$(document).ready(function() {
  const isEntryValid = entry => {
    if (entry === "") {
      return false;
    } else {
      return true;
    }
  };

  //Target the submit button
  const $form = $("#submit-button");
  $form.click(function() {

    const name = $("#first-name").val();
    const lastName = $("#last-name").val();
    const phone = $("#phone-form").val();
    const address = $("#address").val();
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

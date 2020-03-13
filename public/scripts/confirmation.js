$(document).ready(function() {
  function setTransportationMethod(method) {
    localStorage.setItem("transportationMethod", method);
  }

  function reloadPage() {
    location.reload();
  }

  console.log(localStorage.getItem("transportationMethod"));

  $("#walking").click(event => {
    event.preventDefault();
    console.log("test");
    setTransportationMethod("WALKING");
    reloadPage();
  });

  $("#driving").click(event => {
    event.preventDefault();
    setTransportationMethod("DRIVING");
    reloadPage();
  });

  $("#bicycling").click(event => {
    event.preventDefault();
    setTransportationMethod("BICYCLING");
    reloadPage();
  });
  function generateRandomString() {

    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function createConfirmation() {
      return `<h4>Your confirmatuion number is: ${generateRandomString()}</h4>
    <p>Your order will be on the way shortly!</p>
    <h4>It should arrive in approximately 10 minutes</h4>`
    };

    function confirmationPage() {
    $("#confirmation").append(createConfirmation());
      }

  confirmationPage();

});

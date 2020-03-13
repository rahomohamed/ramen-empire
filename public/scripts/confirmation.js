$(document).ready(function() {
  const replaceFunction = entry => {
    return entry.replace(/ /g, "+");
  };
  console.log(googleApiKey);
    const newAddress = localStorage.getItem("address");
    const map = `<iframe
    width="600"
    height="450"
    frameborder="0"
    style="border:0"
    src="https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${newAddress}&destination=Lighthouse+Labs+Toronto&avoid=tolls|highways"
    allowfullscreen
  ></iframe>`;

    $(".google-api").append(map);


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

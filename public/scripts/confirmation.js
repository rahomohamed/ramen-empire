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
});

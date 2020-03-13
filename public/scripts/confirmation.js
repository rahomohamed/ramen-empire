$(document).ready(function() {
  function setTransportationMethod(method) {
    const method = localStorage.setItem("transportationMethod", method);
  }

  function reloadPage() {
    window.reload();
  }

  console.log("my script has loaded");

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

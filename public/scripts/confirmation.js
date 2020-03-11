$(document).ready(function() {
  const replaceFunction = entry => {
    return entry.replace(/ /g, "+");
  };

  $.ajax({
    method: "GET",
    url: "/api/address"
  }).done(res => {
    const newAddress = replaceFunction(res[0].address_name);
    const map = `        <iframe
    width="600"
    height="450"
    frameborder="0"
    style="border:0"
    src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyBSw802_5QvEbUyWjg38mC2j5BpAruClm0&origin=${newAddress}&destination=Lighthouse+Labs+Toronto&avoid=tolls|highways"
    allowfullscreen
  ></iframe>`;

    $(".google-api").append(map);
  });
});

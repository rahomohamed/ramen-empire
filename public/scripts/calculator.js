$(document).ready(function () {
  $(".add").click(function () {
    event.preventDefault();
    let i = parseInt($("#counter").text());
    i++;
    $("#counter").text(i + "X BUCKET OF FRIED CHICKEN");
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
  });
});

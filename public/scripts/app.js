// global variable declarations to be filled in proceeding functions
let menuItems = {};
let order = {};

$(() => {





      // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

  // initialize accordion
  $('.ui.accordion').accordion();

  const createMenuItem = function (item) {
    // article class name should be menu-item
        return `
    <article class = "menu" data-id= ${item.id}>
    <div class="item-image">
      <img class="ui medium circular image" src=${item.image}>
    </div>
    <h3>${item.name}</h3>
    <h4 class="ui dividing header">${item.price}</h4>
    <button class="addCart ui blue button" tabindex="0">Add to cart</button>
    <h4>${item.description}</h4>
    </article>`;
  };


  // renders menu items
  const renderMenu = function(items) {
    for (let item of items) {
      $(".menu-container").append(createMenuItem(item));
    }

    // renders order summary/calculator form when menu item is added to order, also adds class to addCart button to disable it
    $(".addCart").click(function() {
      $(".calculator.ui.form").css("visibility", "visible");
      event.preventDefault();
      const $itemContainer = $(this).parent();
      const itemId = $itemContainer.attr("data-id");
      const itemInfo = menuItems[itemId];
      $itemContainer.find(".addCart").addClass("disabled");

      // variable declarations for tax and total calculations
      const addItem = menuItems[itemId].id;
      // order[addItem] = { qty: 1, name: addItem };
      order[addItem] = { qty: 1};
      const id = Number(itemId) - 1;
      const classId = "class" + id;


      // calculations
      let fried;
      if (order["Fried Chicken Meal"]) {
        fried = ((order["Fried Chicken Meal"].qty * 12))
      } else {
        fried = 0
      };

      let sandwich;
      if (order["Chicken Sandwich"]) {
        sandwich = ((order["Chicken Sandwich"].qty * 11))
      } else {
        sandwich = 0
      };

      let tender;
      if (order["Chicken Tender Meal"]) {
        tender = ((order["Chicken Tender Meal"].qty * 13))
      } else {
        tender = 0
      };

      const preTax = fried + sandwich + tender
      const tax = (preTax * 0.13).toFixed(2)
      const grandTotal = (preTax * 1.13).toFixed(2)

      // buttons are added and taxes/total price for the menu item appear in the summary/calculator form

      $(".new-item").append(
        $(
          `<span id =${classId}><button class="add ui blue button itm-${classId}" tabindex="0">+</button> <button class="remove-itm-${classId} ui red button" tabindex="0">-</button> <span id="t-${classId}" class="counter-${classId}">1 X ${addItem}</span> <br> <br></span>`
        )
      );

      // calculations are done above
      $(".pre-tax").text(`Total Before Tax: $${preTax}`);
      $(".tax-amount").text(`13% HST: $${tax}`);
      $(".total-price").text(`Total Amount: $${grandTotal}`);
      console.log(order)

      // adds items to cart (which have already been added), and updates the tax and total price
      $(`.itm-${classId}`).click(function(event) {
        event.preventDefault();

        const n = Number(classId.split("class")[1]);
        const item = menuItems[n + 1].name;
        order[item].qty++;

        // $(`#t-${classId}`).text(`${order[item].qty} X ${order[item].name}`);
        $(`#t-${classId}`).text(`${order[item].qty} X ${addItem}`);

        // calculations
        let fried;
        if (order["Fried Chicken Meal"]) {
          fried = ((order["Fried Chicken Meal"].qty * 12))
        } else {
          fried = 0
        };

        let sandwich;
        if (order["Chicken Sandwich"]) {
          sandwich = ((order["Chicken Sandwich"].qty * 11))
        } else {
          sandwich = 0
        };

        let tender;
        if (order["Chicken Tender Meal"]) {
          tender = ((order["Chicken Tender Meal"].qty * 13))
        } else {
          tender = 0
        };

        const preTax = fried + sandwich + tender
        const tax = (preTax * 0.13).toFixed(2)
        const grandTotal = (preTax * 1.13).toFixed(2)

        // calculations are done above
        $(".pre-tax").text(`Total Before Tax: $${preTax}`);
        $(".tax-amount").text(`13% HST: $${tax}`);
        $(".total-price").text(`Total Amount: $${grandTotal}`);
        console.log(order)

      });

      // removes items from cart (which have already been added), and updates the tax and total price
      $(`.remove-itm-${classId}`).click(function() {
        event.preventDefault();
        let i = parseInt($(`.counter-${classId}`).text());
        if (i === 1) {
          i = 0;
          $(".addCart").removeClass("disabled");
          $(`#${classId}`).remove();
        } else {
          i--;
        }
        const n = Number(classId.split("class")[1]);
        const item = menuItems[n + 1].name;
        order[item].qty--;
        // removes the first occurence of the menu item (we need to make the item row dissappear when you get to 0)
        $(`.${classId}, .counter-${classId}`).text(
          // `${order[item].qty} X ${order[item].name}`
          `${order[item].qty} X ${addItem}`
        );
        // calculations
        let fried;
        if (order["Fried Chicken Meal"]) {
          fried = ((order["Fried Chicken Meal"].qty * 12))
        } else {
          fried = 0
        };

        let sandwich;
        if (order["Chicken Sandwich"]) {
          sandwich = ((order["Chicken Sandwich"].qty * 11))
        } else {
          sandwich = 0
        };

        let tender;
        if (order["Chicken Tender Meal"]) {
          tender = ((order["Chicken Tender Meal"].qty * 13))
        } else {
          tender = 0
        };

        const preTax = fried + sandwich + tender
        const tax = (preTax * 0.13).toFixed(2)
        const grandTotal = (preTax * 1.13).toFixed(2)

        // calculations are done above
        $(".pre-tax").text(`Total Before Tax: $${preTax}`);
        $(".tax-amount").text(`13% HST: $${tax}`);
        $(".total-price").text(`Total Amount: $${grandTotal}`);
        console.log(order)

        if (order[item].qty <= 0) {
          delete order[item];
        }
      });

    });
  };

  // loads menu items
  const loadMenu = function() {
    $.ajax({
      url: "/api/menu",
      method: "GET"
    }).then(response => {
      for (let item of response) {
        menuItems[item.id] = item;
      }
      renderMenu(response);
    });
  };
  loadMenu();
});

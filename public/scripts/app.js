// global variable declarations to be filled in proceeding functions
let menuItems = {};
let order = {};

$(() => {
  // template for menu items
  const createMenuItem = function(item) {
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
      $("#menu-container").append(createMenuItem(item));
    }

    // renders order summary/calculator form when menu item is added to order, also adds class to addCart button to disable it
    $(".addCart").click(function() {
      $(".calculator.ui.form").css("visibility", "visible");
      event.preventDefault();
      const $itemContainer = $(this).parent();
      const itemId = $itemContainer.attr("data-id");
      const itemInfo = menuItems[itemId];
      console.log("-------------------", itemInfo);
      $itemContainer.find(".addCart").addClass("disabled");

      // variable declarations for tax and total calculations
      const addItem = menuItems[itemId].name;
      const addPreTax = parseFloat(menuItems[itemId].price);
      const addTax = (addPreTax * 0.13).toFixed(2);
      const addTotal = (addPreTax * 1.13).toFixed(2);
      order[addItem] = { qty: 1, name: addItem };
      // order = {
      // name: quantity
      // } ===> order[name].qty -> quantity
      // order = [{}, {}]
      const id = Number(itemId) - 1;
      const classId = "class" + id;
      console.log(order);

      // buttons are added and taxes/total price for the menu item appear in the summary/calculator form

      $(".new-item").append(
        $(
          `<span id =${classId}><button class="add ui blue button itm-${classId}" tabindex="0">+</button> <button class="remove-itm-${classId} ui red button" tabindex="0">-</button> <span id="t-${classId}" class="counter-${classId}">1 X ${addItem}</span> <br> <br></span>`
        )
      );
      $(".pre-tax").text(`Total Before Tax: $${addPreTax}`);
      $(".tax-amount").text(`13% HST: $${addTax}`);
      $(".total-price").text(`Total Amount: $${addTotal}`);

      // adds items to cart (which have already been added), and updates the tax and total price
      $(`.itm-${classId}`).click(function(event) {
        event.preventDefault();
        const n = Number(classId.split("class")[1]);
        const item = menuItems[n + 1].name;
        order[item].qty++;

        $(`#t-${classId}`).text(`${order[item].qty} X ${order[item].name}`);
        let j = addPreTax;
        let i = parseInt($(`.counter-${classId}`).text());
        // $(".new-item").html(`<button class="add ui blue button itm-${classId}" tabindex="0">+</button> <button class="remove ui red button ${classId}" tabindex="0">-</button> <span class="counter ${classId}">${tempO.qty} X ${(tempO.name)}</span> <br> <br>`);
        $(".pre-tax").text("Total Before Tax: $" + (i * j).toFixed(2));
        $(".tax-amount").text("13% HST: $" + (i * j * 0.13).toFixed(2));
        $(".total-price").text("Total Amount: $" + (i * j * 1.13).toFixed(2));
      });

      // removes items from cart (which have already been added), and updates the tax and total price
      $(`.remove-itm-${classId}`).click(function() {
        event.preventDefault();
        let i = parseInt($(`.counter-${classId}`).text());
        console.log("I IS", i);
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
          `${order[item].qty} X ${order[item].name}`
        );
        let j = addPreTax;
        $(".pre-tax").text("Total Before Tax: $" + (i * j).toFixed(2));
        $(".tax-amount").text("13% HST: $" + (i * j * 0.13).toFixed(2));
        $(".total-price").text("Total Amount: $" + (i * j * 1.13).toFixed(2));
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

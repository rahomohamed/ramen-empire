// global variable declarations to be filled in proceeding functions
let menuItems = {};
let order = {};
const orderTest = {1: {qty: 3}, 2: {qty: 2}};

$(() => {
  loadMenu();

  // $("#submit-order").click(function() {
  //   event.preventDefault();
  //   sendOrderToDb(orderTest);
  // });
});

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

const sendOrderToDb = function (orderTest) {
  console.log('Order AJAX hit: ', orderTest)
  $.ajax({
    url: '/api/orders',
    method: "POST",
    data: orderTest
  })
  .then(response => {
    console.log('after Ajax post: ');
  });
}

const createOrderItem = function(item) {
  return `
    <span id=${item.id}>
      <button type="button" class="add ui blue button itm-${item.id}" tabindex="0">+</button>
      <button type="button" class="remove-itm-${item.id} ui red button" tabindex="0">-</button>
      <span id="t-${item.id}" class="counter-${item.id}">1</span> X <span>${item.name}</span>
      <br>
      <br>
    </span>`
}

// template for menu items
const createMenuItem = function(item) {
  return `
  <article class="menu" data-id=${item.id}>
    <div class="item-image">
      <img class="ui medium circular image" src=${item.image}>
    </div>
    <h3>${item.name}</h3>
    <h4 class="ui dividing header">${item.price}</h4>
    <button class="addCart ui blue button" type="button" tabindex="0">Add to cart</button>
    <h4>${item.description}</h4>
  </article>`;
};

const addAddCartHandler = (item) => {
  const menuItem = menuItems[item.id];
  order[menuItem.id] = { qty: 1, menuItem };

  const menuItemEl = $(`.menu [data-id=${item.id}]`);
  menuItemEl.find('.addCart').on('click', function() {
    $(this).addClass("disabled");
    handleAddToCart(item);
  });
}

const handleAddToCart  = (item) => {
  const menuItem = menuItems[item.id];
  const orderItem = order[menuItem.id];
  console.log({ menuItem, order, price: orderItem.menuItem.price })

  // if qty is 1 then its first time
  if (orderItem.qty === 1) {
    const orderItem = createOrderItem(item);
    $(".new-item").append(orderItem);
  }

  // if ( > 1 ) {
    // if qty is more than one
    // order[menuItem.id].qty = order[menuItem.id].qty + 1;
    // todo: increment by one .counter-${item.id}
  // }

  // todo: calculate new prices
  showPrice(10, 1.5, 11.5);
}

// todo: implement
// const calculatePrice(orderItem)

const showPrice = (preTax, tax, grandTotal) => {
  $(".pre-tax").text(`Total Before Tax: $${preTax}`);
  $(".tax-amount").text(`13% HST: $${tax}`);
  $(".total-price").text(`Total Amount: $${grandTotal}`);
}

// renders menu items
const renderMenu = function(items) {
  for (let item of items) {
    const menuItem = createMenuItem(item);
    $("#menu-container").append(menuItem);
    addAddCartHandler(item);
  }

  // // renders order summary/calculator form when menu item is added to order, also adds class to addCart button to disable it
  // $(".addCart").on('click', function() {
  //   $itemContainer.find(".addCart").addClass("disabled");
  //   $(".calculator.ui.form").css("visibility", "visible");

  //   const $itemContainer = $(this).parent();
  //   const itemId = $itemContainer.attr("data-id");

  //   const id = Number(itemId) - 1;
  //   const classId = "class" + id;
  //   // calculations
  //   let fried;
  //   if (order["Fried Chicken Meal"]) {
  //     fried = ((order["Fried Chicken Meal"].qty * 12))
  //   } else {
  //     fried = 0
  //   };
  //   let sandwich;
  //   if (order["Chicken Sandwich"]) {
  //     sandwich = ((order["Chicken Sandwich"].qty * 11))
  //   } else {
  //     sandwich = 0
  //   };
  //   let tender;
  //   if (order["Chicken Tender Meal"]) {
  //     tender = ((order["Chicken Tender Meal"].qty * 13))
  //   } else {
  //     tender = 0
  //   };
  //   const preTax = fried + sandwich + tender
  //   const tax = (preTax * 0.13).toFixed(2)
  //   const grandTotal = (preTax * 1.13).toFixed(2)
  //   // buttons are added and taxes/total price for the menu item appear in the summary/calculator form
  //   $(".new-item").append(
  //     $(
  //       `<span id =${classId}><button class="add ui blue button itm-${classId}" tabindex="0">+</button> <button class="remove-itm-${classId} ui red button" tabindex="0">-</button> <span id="t-${classId}" class="counter-${classId}">1 X ${addItem}</span> <br> <br></span>`
  //     )
  //   );
  //   // calculations are done above
  //   $(".pre-tax").text(`Total Before Tax: $${preTax}`);
  //   $(".tax-amount").text(`13% HST: $${tax}`);
  //   $(".total-price").text(`Total Amount: $${grandTotal}`);
  //   console.log(order)
  //   // adds items to cart (which have already been added), and updates the tax and total price
  //   $(`.itm-${classId}`).click(function(event) {
  //     event.preventDefault();
  //     const n = Number(classId.split("class")[1]);
  //     const item = menuItems[n + 1].name;
  //     order[item].qty++;
  //     // $(`#t-${classId}`).text(`${order[item].qty} X ${order[item].name}`);
  //     $(`#t-${classId}`).text(`${order[item].qty} X ${addItem}`);
  //     // calculations
  //     let fried;
  //     if (order["Fried Chicken Meal"]) {
  //       fried = ((order["Fried Chicken Meal"].qty * 12))
  //     } else {
  //       fried = 0
  //     };
  //     let sandwich;
  //     if (order["Chicken Sandwich"]) {
  //       sandwich = ((order["Chicken Sandwich"].qty * 11))
  //     } else {
  //       sandwich = 0
  //     };
  //     let tender;
  //     if (order["Chicken Tender Meal"]) {
  //       tender = ((order["Chicken Tender Meal"].qty * 13))
  //     } else {
  //       tender = 0
  //     };
  //     const preTax = fried + sandwich + tender
  //     const tax = (preTax * 0.13).toFixed(2)
  //     const grandTotal = (preTax * 1.13).toFixed(2)
  //     // calculations are done above
  //     $(".pre-tax").text(`Total Before Tax: $${preTax}`);
  //     $(".tax-amount").text(`13% HST: $${tax}`);
  //     $(".total-price").text(`Total Amount: $${grandTotal}`);
  //     console.log(order)
  //   });



  //   // removes items from cart (which have already been added), and updates the tax and total price
  //   $(`.remove-itm-${classId}`).click(function() {
  //     event.preventDefault();
  //     let i = parseInt($(`.counter-${classId}`).text());
  //     if (i === 1) {
  //       i = 0;
  //       $(".addCart").removeClass("disabled");
  //       $(`#${classId}`).remove();
  //     } else {
  //       i--;
  //     }
  //     const n = Number(classId.split("class")[1]);
  //     const item = menuItems[n + 1].name;
  //     order[item].qty--;
  //     // removes the first occurence of the menu item (we need to make the item row dissappear when you get to 0)
  //     $(`.${classId}, .counter-${classId}`).text(
  //       // `${order[item].qty} X ${order[item].name}`
  //       `${order[item].qty} X ${addItem}`
  //     );
  //     // calculations
  //     let fried;
  //     if (order["Fried Chicken Meal"]) {
  //       fried = ((order["Fried Chicken Meal"].qty * 12))
  //     } else {
  //       fried = 0
  //     };
  //     let sandwich;
  //     if (order["Chicken Sandwich"]) {
  //       sandwich = ((order["Chicken Sandwich"].qty * 11))
  //     } else {
  //       sandwich = 0
  //     };
  //     let tender;
  //     if (order["Chicken Tender Meal"]) {
  //       tender = ((order["Chicken Tender Meal"].qty * 13))
  //     } else {
  //       tender = 0
  //     };
  //     const preTax = fried + sandwich + tender
  //     const tax = (preTax * 0.13).toFixed(2)
  //     const grandTotal = (preTax * 1.13).toFixed(2)
  //     // calculations are done above
  //     $(".pre-tax").text(`Total Before Tax: $${preTax}`);
  //     $(".tax-amount").text(`13% HST: $${tax}`);
  //     $(".total-price").text(`Total Amount: $${grandTotal}`);
  //     console.log(order)
  //     if (order[item].qty <= 0) {
  //       delete order[item];
  //     }
  //   });
  // });
};


// createOrderItem
  // add click handler
// renderOrderItem
//

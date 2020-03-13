// global variable declarations to be filled in proceeding functions
// global variable declarations to be filled in proceeding functions
let menuItems = {};
let order = [];
let preTax = 0;
let tax = 0;
let grandTotal = 0;

// document ready
$(() => {
  const createOrderItem = function(item) {
    return `
      <span id=${item.id}>
        <button type="button" class="add ui blue button"  tabindex="0">+</button>
        <button type="button" class="remove ui red button" tabindex="0">-</button>
        <span  class="counter-${item.id}">${item.quantity}</span> X <span>${item.name}</span>
        <br>
        <br>
      </span>`;
  };

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

  // calculator math
  function preTax1()  {
    let preTax = 0;
    order.forEach(order=> {
      preTax = preTax +  Number((order.price * order.quantity).toFixed(2));
    });
    return preTax;
  }
  function tax1(preTax) {
    return (preTax * 0.13).toFixed(2);
  }
  function grandTotal1(preTax) {
    return (preTax * 1.13).toFixed(2);
  }
  let calculatePrice = (item) => {
    preTax = preTax1();
    tax = tax1(preTax);
    grandTotal = grandTotal1(preTax);
  };
  let showPrice = (preTax, tax, grandTotal) => {
    $(".pre-tax").text(`Total Before Tax: $${preTax}`);
    $(".tax-amount").text(`13% HST: $${tax}`);
    $(".total-price").text(`Total Amount: $${grandTotal}`);
  };
  function resetPrices(preTax,tax, grandTotal) {
    preTax = 0;
    tax = 0;
    grandTotal = 0;
  }

  // when a menu item is rendered, function is added to add to cart button
  const addAddCartHandler = (item) => {
    resetPrices();
    const menuItem = menuItems[item.id];
    // when add to cart button is clicked
    const menuItemEl = $(`.menu [data-id=${item.id}]`);
    menuItemEl.find('.addCart').on('click', function() {
      $(this).addClass("disabled");
      handleAddToCart(item);
      calculatePrice(item);
      showPrice(preTax, tax, grandTotal);
    });
  };
  // counter function
  const updateCounter = (item) => {
    const orderItemEl = $(`#${item.id}`);
    let counter = orderItemEl.find(`.counter-${ item.id }`);
    $(counter).text(item.quantity);
  };
  // increment function for + button
  const increment = (id) => {
    order.forEach(item => {
      if (item.id === id) {
        item.quantity++;
        updateCounter(item);
      }
    });
  };
  // handler for increment buttons
  const incrementHandler = (orderItem) => {
    const orderItemId = orderItem.id;
    // when add to cart button is clicked
    const orderItemEl = $(`#${orderItemId}`);
    orderItemEl.find('.add').on('click', function() {
      increment(orderItemId);
      calculatePrice(orderItem);
      showPrice(preTax, tax, grandTotal);
    });
  };
  // decrement function for - button
  const decrement = (id) => {
    order.forEach(item => {
      if (item.id === id && item.quantity > 0) {
        item.quantity--;
        updateCounter(item);
      }
      if (item.quantity === 0) {
        const menuItemEl = $(`.menu [data-id=${item.id}]`);
        $(menuItemEl).find(".addCart").removeClass("disabled");
        const orderItemEl = $(`#${item.id}`);
        orderItemEl.remove();
      }
    });
  };
  // handler for decrement buttons
  const decrementHandler = (orderItem) => {
    const orderItemId = orderItem.id;
    // when add to cart button is clicked
    const orderItemEl = $(`#${orderItemId}`);
    orderItemEl.find('.remove').on('click', function() {
      decrement(orderItemId);
      calculatePrice(orderItem);
      showPrice(preTax, tax, grandTotal);
    });
  };
  // after add to cart button is clicked
  const handleAddToCart  = (item) => {
    const menuItem = menuItems[item.id];
    let orderItem = {
      'id': menuItem.id,
      'name': menuItem.name,
      'price': menuItem.price,
      'quantity': 1
    };
    order.push(orderItem);
    $(".new-item").append(createOrderItem(orderItem));
    incrementHandler(orderItem);
    decrementHandler(orderItem);
  };
  // renders menu items
  const renderMenu = function(items) {
    for (let item of items) {
      const menuItem = createMenuItem(item);
      $("#menu-container").append(menuItem);
      addAddCartHandler(item);
    }
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

  const sendOrderToLocalStorage = function(orders) {
    $.ajax({
      url: '/api/order',
      method: "POST",
      data: JSON.stringify(orders)
    })
      .then(res => {
        addtoLocalStorage(order);
        window.location.replace('/payment');
      });
  };
  function addtoLocalStorage(order) {
    localStorage.setItem("order",JSON.stringify(order));
    localStorage.setItem("preTax", preTax);
    localStorage.setItem("tax", tax);
    localStorage.setItem("grandTotal", grandTotal);
  }

  $("#submit-order").click(function() {
    event.preventDefault();
    sendOrderToLocalStorage(order);
  });

});


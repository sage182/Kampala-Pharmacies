/**
 * Application controller.
 * Connects browser events to the catalogue, basket, order, and rendering modules;
 * business rules and DOM-building logic live in their respective modules.
 */

// Cache the page elements once so event handlers share the same references.
const elements = {
    products: document.getElementById("productList"),
    search: document.getElementById("search"),
    category: document.getElementById("category"),
    basket: document.getElementById("basketItems"),
    total: document.getElementById("total"),
    basketCount: document.getElementById("basketCount"),
    orderForm: document.getElementById("orderForm"),
    confirmation: document.getElementById("confirmation"),
    orderStatus: document.getElementById("orderStatus"),
    advanceStatus: document.getElementById("advanceStatus")
};

// Apply the current text/category controls, then display only matching products.
function refreshProducts() {
    const matchingProducts = filterProducts(PRODUCTS, elements.search.value, elements.category.value);
    renderProducts(elements.products, matchingProducts);
}

// Re-render basket rows, item count, and total from the current basket state.
function refreshCart() {
    renderCart(elements.basket, elements.total, elements.basketCount, cart);
}

// Handle product-card clicks through event delegation (one listener for all cards).
function handleProductAction(event) {
    const button = event.target.closest("button[data-action='add']");
    if (!button) return;

    const added = addProductToCart(button.dataset.productId);
    if (!added) {
        alert("This product cannot be added because it is out of stock or at its stock limit.");
        return;
    }

    refreshCart();
}

// Route basket buttons to the matching quantity/removal operation.
function handleCartAction(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const productId = button.dataset.productId;
    if (button.dataset.action === "increase" && !changeCartQuantity(productId, 1)) {
        alert("Maximum available stock reached.");
    } else if (button.dataset.action === "decrease") {
        changeCartQuantity(productId, -1);
    } else if (button.dataset.action === "remove") {
        removeCartItem(productId);
    }

    refreshCart();
}

// Validate the form, create a demo order, and synchronize the page after checkout.
function handleOrderSubmit(event) {
    event.preventDefault();
    if (!elements.orderForm.reportValidity()) return;

    if (!cart.length) {
        alert("Your shopping basket is empty.");
        return;
    }

    // Keep customer details together so the order service receives one clear object.
    const customer = {
        name: document.getElementById("customerName").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        area: document.getElementById("area").value.trim(),
        address: document.getElementById("address").value.trim()
    };
    const order = createDemoOrder(customer, cart);
    if (!order) return;

    renderOrderConfirmation(elements.confirmation, order);
    elements.orderStatus.textContent = "Order #" + order.number + " - " + order.status;
    elements.advanceStatus.disabled = false;

    clearCart();
    refreshCart();
    refreshProducts();
    elements.orderForm.reset();
}

// Advance the simulated order and disable the button when it reaches completion.
function handleStatusAdvance() {
    const order = advanceOrderStatus();
    if (!order) return;

    elements.orderStatus.textContent = "Order #" + order.number + " - " + order.status;
    elements.advanceStatus.disabled = order.status === ORDER_STATUSES[ORDER_STATUSES.length - 1];
}

// Register interactions once; delegated clicks keep dynamically-rendered controls working.
elements.search.addEventListener("input", refreshProducts);
elements.category.addEventListener("change", refreshProducts);
elements.products.addEventListener("click", handleProductAction);
elements.basket.addEventListener("click", handleCartAction);
elements.orderForm.addEventListener("submit", handleOrderSubmit);
elements.advanceStatus.addEventListener("click", handleStatusAdvance);

// Draw the initial catalogue and empty-basket state on page load.
refreshProducts();
refreshCart();

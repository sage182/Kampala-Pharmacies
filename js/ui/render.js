/**
 * UI rendering helpers.
 * This module translates application data into DOM elements; it does not change business state.
 */
function renderProducts(productList, products) {
    // Replace old cards so the displayed catalogue always reflects the latest filter and stock.
    productList.replaceChildren();

    if (!products.length) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No products found.";
        productList.append(emptyMessage);
        return;
    }

    // Build elements with textContent rather than injecting product data as HTML.
    products.forEach(function (product) {
        const card = document.createElement("article");
        card.className = "card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        if (product.imageFit === "cover") image.className = "cover";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = "Price: UGX " + product.price.toLocaleString();

        const stock = document.createElement("p");
        stock.className = product.stock > 0 ? "stock" : "stock out";
        stock.textContent = product.stock > 0 ? "In Stock: " + product.stock : "Out of Stock";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn";
        button.dataset.action = "add";
        button.dataset.productId = product.id;
        button.textContent = product.stock > 0 ? "Add to Basket" : "Unavailable";
        button.disabled = product.stock <= 0;

        card.append(image, name, category, price, stock, button);
        productList.append(card);
    });
}

function renderCart(container, totalElement, countElement, items) {
    container.replaceChildren();
    // The count represents units, while the rows represent distinct products.
    countElement.textContent = String(getCartCount());

    if (!items.length) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your basket is empty.";
        container.append(emptyMessage);
        totalElement.textContent = "0";
        return;
    }

    // Render each basket row and its accessible quantity/removal controls.
    items.forEach(function (item) {
        const row = document.createElement("div");
        row.className = "basket-row";

        const details = document.createElement("div");
        const name = document.createElement("h3");
        name.textContent = item.name;
        const price = document.createElement("p");
        price.textContent = "Price: UGX " + item.price.toLocaleString();
        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;
        const subtotal = document.createElement("p");
        subtotal.textContent = "Subtotal: UGX " + (item.price * item.quantity).toLocaleString();
        details.append(name, price, quantity, subtotal);

        const actions = document.createElement("div");
        actions.className = "basket-actions";
        actions.append(
            createCartButton("−", "decrease", item.id, "Decrease quantity"),
            createCartButton("+", "increase", item.id, "Increase quantity"),
            createCartButton("Remove", "remove", item.id, "Remove " + item.name)
        );

        row.append(details, actions);
        container.append(row);
    });

    totalElement.textContent = getCartTotal().toLocaleString();
}

function createCartButton(label, action, productId, accessibleLabel) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.action = action;
    button.dataset.productId = productId;
    button.setAttribute("aria-label", accessibleLabel);
    button.textContent = label;
    return button;
}

// Display a submitted-order snapshot; textContent keeps customer-provided text inert.
function renderOrderConfirmation(container, order) {
    container.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = "Order Submitted Successfully!";
    const details = [
        "Order Number: " + order.number,
        "Customer: " + order.customer.name,
        "Phone: " + order.customer.phone,
        "Address: " + order.customer.address,
        "Delivery area: " + order.customer.area,
        "Total Amount: UGX " + order.total.toLocaleString(),
        "Status: " + order.status,
        "Thank you for shopping with Kampala Pharmacy!"
    ];

    container.append(heading);
    details.forEach(function (text) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        container.append(paragraph);
    });
}

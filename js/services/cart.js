/**
 * Basket state and business rules.
 * This module changes cart data only; the UI module is responsible for displaying it.
 */
const cart = [];

// Catalogue product IDs are numeric; normalize IDs received from HTML data attributes.
function findProduct(productId) {
    return PRODUCTS.find(function (product) {
        return product.id === Number(productId);
    });
}

// Find a basket row by product ID, or return undefined when it is not in the basket.
function findCartItem(productId) {
    return cart.find(function (item) {
        return item.id === Number(productId);
    });
}

// Add one unit when stock allows; return false when the item cannot be added.
function addProductToCart(productId) {
    const product = findProduct(productId);
    if (!product || product.stock < 1) return false;

    const item = findCartItem(productId);
    if (item) {
        if (item.quantity >= product.stock) return false;
        item.quantity += 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }

    return true;
}

// Apply a quantity delta, removing the row if the new quantity would be zero.
function changeCartQuantity(productId, amount) {
    const item = findCartItem(productId);
    const product = findProduct(productId);
    if (!item || !product) return false;

    const nextQuantity = item.quantity + amount;
    if (nextQuantity <= 0) {
        removeCartItem(productId);
        return true;
    }
    if (nextQuantity > product.stock) return false;

    item.quantity = nextQuantity;
    return true;
}

// Remove exactly one product row; report whether a matching row was found.
function removeCartItem(productId) {
    const itemIndex = cart.findIndex(function (item) {
        return item.id === Number(productId);
    });
    if (itemIndex === -1) return false;

    cart.splice(itemIndex, 1);
    return true;
}

// Calculate the basket value from each unit price multiplied by its quantity.
function getCartTotal() {
    return cart.reduce(function (total, item) {
        return total + item.price * item.quantity;
    }, 0);
}

// Count individual units rather than distinct product rows.
function getCartCount() {
    return cart.reduce(function (count, item) {
        return count + item.quantity;
    }, 0);
}

// Empty the existing array in place so references to cart remain valid.
function clearCart() {
    cart.length = 0;
}

/**
 * Demo order rules and lifecycle.
 * Orders are kept in memory only; this project does not send orders to a server.
 */
const ORDER_STATUSES = ["Order Received", "Preparing Order", "Ready for Delivery", "Completed"];
let latestOrder = null;

// Copy basket rows so later basket changes cannot alter the submitted order record.
function createDemoOrder(customer, items) {
    if (!items.length) return null;

    const orderedItems = items.map(function (item) {
        return { id: item.id, name: item.name, price: item.price, quantity: item.quantity };
    });

    // Deduct the purchased quantities from the live catalogue stock.
    orderedItems.forEach(function (item) {
        const product = findProduct(item.id);
        if (product) product.stock -= item.quantity;
    });

    // Store the single active demo order and calculate its total from the snapshot.
    latestOrder = {
        number: Math.floor(Math.random() * 90000) + 10000,
        customer: customer,
        items: orderedItems,
        total: orderedItems.reduce(function (sum, item) {
            return sum + item.price * item.quantity;
        }, 0),
        status: ORDER_STATUSES[0]
    };

    return latestOrder;
}

// Move one step forward in the workflow; leave the order at its final status.
function advanceOrderStatus() {
    if (!latestOrder) return null;

    const currentIndex = ORDER_STATUSES.indexOf(latestOrder.status);
    latestOrder.status = ORDER_STATUSES[Math.min(currentIndex + 1, ORDER_STATUSES.length - 1)];
    return latestOrder;
}

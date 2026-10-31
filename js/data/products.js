/**
 * Product catalogue seed data.
 * Each record supplies the fields used by filtering, stock checks, pricing, and product cards.
 * Stock is held in memory and resets when the page is reloaded.
 */
const PRODUCTS = [
    { id: 1, name: "Paracetamol", category: "Wellness", price: 5000, stock: 20, image: "images/product-placeholder.svg" },
    { id: 2, name: "First Aid Kit", category: "First Aid", price: 25000, stock: 10, image: "images/product-placeholder.svg" },
    { id: 3, name: "Baby Lotion", category: "Baby Care", price: 18000, stock: 15, image: "images/product-placeholder.svg" },
    { id: 4, name: "Vitamin C", category: "Wellness", price: 12000, stock: 25, image: "images/product-placeholder.svg" },
    { id: 5, name: "Body Lotion", category: "Personal Care", price: 15000, stock: 12, image: "images/product-placeholder.svg" },
    { id: 6, name: "Hand Sanitizer", category: "Hygiene", price: 8000, stock: 30, image: "images/product-placeholder.svg" }
];

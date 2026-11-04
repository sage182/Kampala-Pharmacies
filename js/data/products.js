/**
 * Product catalogue seed data.
 * Each record supplies the fields used by filtering, stock checks, pricing, and product cards.
 * Stock is held in memory and resets when the page is reloaded.
 */
const PRODUCTS = [
    { id: 1, name: "Paracetamol", category: "Wellness", price: 5000, stock: 20, image: "images/WhatsApp Image 2026-11-04 at 2.38.37 PM.jpeg" },
    { id: 2, name: "First Aid Kit", category: "First Aid", price: 25000, stock: 10, image: "images/WhatsApp Image 2026-11-04 at 2.38.36 PM.jpeg" },
    { id: 3, name: "Baby Lotion", category: "Baby Care", price: 18000, stock: 15, image: "images/WhatsApp Image 2026-11-04 at 2.38.48 PM (1).jpeg", imageFit: "cover" },
    { id: 4, name: "Vitamin C Gummies", category: "Wellness", price: 12000, stock: 25, image: "images/WhatsApp Image 2026-11-04 at 2.38.34 PM (1).jpeg" },
    { id: 5, name: "Body Lotion", category: "Personal Care", price: 15000, stock: 12, image: "images/WhatsApp Image 2026-11-04 at 2.38.49 PM (2).jpeg", imageFit: "cover" },
    { id: 6, name: "Hand Sanitizer", category: "Hygiene", price: 8000, stock: 30, image: "images/WhatsApp Image 2026-11-04 at 2.38.51 PM.jpeg", imageFit: "cover" },
    { id: 7, name: "Panadol Extra Tablets", category: "Wellness", price: 9000, stock: 20, image: "images/WhatsApp Image 2026-11-04 at 2.38.34 PM.jpeg" }
];

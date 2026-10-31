/** Product-catalogue query logic; returns matches without modifying the source list. */
function filterProducts(products, searchText, category) {
    // Ignore search casing and surrounding spaces for a friendlier search experience.
    const normalizedSearch = searchText.trim().toLowerCase();

    // A product is included only when its name and selected category both match.
    return products.filter(function (product) {
        const matchesName = product.name.toLowerCase().includes(normalizedSearch);
        const matchesCategory = category === "All" || product.category === category;
        return matchesName && matchesCategory;
    });
}

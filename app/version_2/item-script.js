document.addEventListener("DOMContentLoaded", function () {
    var productDetails = $('#productDescription');

    var urlParams = new URLSearchParams(window.location.search);
    var productName = urlParams.get('name');

    if (productName) {
        $.getJSON("./resources/vegetables.json", function(result) {
            var product = result.find(item => item.product_name === productName);

            if (product) {
                productDetails.append(`<h1>${product.product_name}</h1>`);
                productDetails.append(`<p><strong>🏣 Magasin:</strong> Carrefour</p>`);
                productDetails.append(`<p><strong>⛰️ Origine:</strong> ${product.origin}</p>`);
                productDetails.append(`<p><strong>💸 Prix:</strong> ${product.price} €</p>`);
                productDetails.append(`<p><strong>🚚 Distance:</strong> ${product.distance} km</p>`);
            } else {
                productDetails.append('<p>Product not found</p>');
            }
        });
    } else {
        productDetails.append('<p>No product name provided</p>');
    }
});

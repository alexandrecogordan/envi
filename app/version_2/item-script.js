document.addEventListener("DOMContentLoaded", function () {
    var productDetails = $('#productDescription');

    var urlParams = new URLSearchParams(window.location.search);
    var productName = urlParams.get('name');

    if (productName) {
        $.getJSON("./resources/vegetables.json", function(result) {
            var product = result.find(item => item.product_name === productName);

            if (product) {
                productDetails.append(`<h1>${product.product_name}</h1>`);
                productDetails.append(`<img src="${product.image}" alt="${product.product_name}" style="border-radius: 20px;">`);
                productDetails.append(`<p><strong>🏣 Magasin:</strong> Carrefour</p>`);
                productDetails.append(`<p><strong>⛰️ Origine:</strong> ${product.origin}</p>`);
                
                if (!product.unit_price) {
                    product.unit_price = "";
                }
                productDetails.append(`<p><strong>💸 Prix:</strong> ${product.price} € (${product.unit_price}) </p>`);

                productDetails.append(`<p><strong>🚚 Distance:</strong> ${product.distance} km</p>`);

                if (product.bio) {
                    product.bio = "Oui";
                } else {
                    product.bio = "Non";
                }
                productDetails.append(`<p><strong>🌱 Bio:</strong> ${product.bio}</p>`);

                
            } else {
                productDetails.append('<p>Product not found</p>');
            }
        });
    } else {
        productDetails.append('<p>No product name provided</p>');
    }

    function highlightCountryOnMap(countryName) {
        // Initialize the map if not already initialized
        // ...
    
        var country = geojsonData.features.find(feature => feature.properties.name === countryName);
    
        // Highlight the country
        // This could involve setting a different style for the country's layer
        if (country) {
            // Code to highlight the country on the map
        }
    }
});
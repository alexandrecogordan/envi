document.addEventListener("DOMContentLoaded", function () {
    var productDetails = $('#productDescription');
    var productFootprint = $('#productFootprint');

    var urlParams = new URLSearchParams(window.location.search);
    var productName = urlParams.get('name');

    const countryCoordinates = {
        "Espagne": [40.4637, -3.7492],
        "Israel": [31.0461, 34.8516],
        "France": [46.2276, 2.2137],
        "Perou": [-9.19, -75.0152],
        "Italie": [41.8719, 12.5674],
        "Rwanda": [-1.9403, 29.8739],
        "Senegal": [14.4974, -14.4524],
        "Maroc": [31.7917, -7.0926],
        "Republique dominicaine": [18.7357, -70.1627],
        "Colombie": [4.5709, -74.2973],
        "Pays-bas": [52.1326, 5.2913],
        "Pologne": [51.9194, 19.1451],
        "Canada": [56.1304, -106.3468],
        "Afrique du sud": [-30.5595, 22.9375],
        "Belgique": [50.5039, 4.4699],
        "Portugal": [39.3999, -8.2245],
        "Inde": [20.5937, 78.9629],
        "Origine ue et hors u.e.": [0, 0],
        "Origine pays tiers": [0, 0],
        "Origine c.e.e.": [0, 0],
        "Union europeenne": [0, 0],
        "Ue et hors u.e.": [0, 0]
    };

    if (productName) {
        $.getJSON("./resources/vegetables.json", function(result) {
            var product = result.find(item => item.product_name === productName);

            if (product) {

                // Product Details

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

                // Product Footprint

                productFootprint.append(`<h1>Categorie: <br></h1><h2>${product.category}</h2>`);

                productFootprint.append(`
                <div class="progress-container">
                    <div class="progress-name"><strong>🌾 Agriculture</strong></div>
                    <div class="progress-bar">
                        <div class="progress-percentage" percentage="70%" style="max-width:70%"></div>
                    </div>
                </div>
                `);

                // productFootprint.append(`<p><strong>Transformation:</strong></p>`);

                // productFootprint.append(`<div class="progress-container"><p class="progress-bar" style="width:${(product.transformation / product.carbon_footprint).toFixed(1) * 100}%;"><i class="fa-solid fa-leaf"></i><span class="progress-text">${(product.transformation / product.carbon_footprint).toFixed(1)}% (${product.transformation.toFixed(1)}kg)</span></p></div>`);

                productFootprint.append(`<p><strong>🏭 Transformation:</strong> ${(product.transformation / product.carbon_footprint).toFixed(1)}% (${product.transformation.toFixed(1)}kg)</p>`);

                // productFootprint.append(`<p><strong>Emballage:</strong></p>`);

                productFootprint.append(`<p><strong>📦 Emballage:</strong> ${(product.packaging / product.carbon_footprint).toFixed(1)}% (${product.packaging}kg)</p>`);

                productFootprint.append(`<p><strong>🚚 Transport:</strong> ${(product.transport / product.carbon_footprint).toFixed(1)}% (${product.transport.toFixed(1)}kg)</p>`);

                productFootprint.append(`<p><strong>🏬 Distribution:</strong> ${(product.distribution / product.carbon_footprint).toFixed(1)}% (${product.distribution.toFixed(1)}kg)</p>`);

                productFootprint.append(`<p><strong>🍽️ Consommation:</strong> ${(product.consommation / product.carbon_footprint).toFixed(1)}% (${product.consommation.toFixed(1)}kg)</p>`);

                productFootprint.append(`<p><strong>🌍 Carbon Footprint:</strong> ${parseFloat(product.carbon_footprint).toFixed(2)}kg</p>`);
            } else {
                productDetails.append('<p>Product not found</p>');
            }
        });
    } else {
        productDetails.append('<p>No product name provided</p>');
    }

    const map = L.map('map').setView([20, 0], 2); // Set view to show the whole world

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Function to add markers to the map
    function addMarkers(data) {
        data.forEach(item => {
            const coordinates = countryCoordinates[item.origin] || countryCoordinates["default"];
            if (coordinates[0] !== 0 || coordinates[1] !== 0) { // Skip markers with default [0, 0] coordinates
                L.marker(coordinates)
                    .bindPopup(`<b>${item.product_name}</b><br>Origin: ${item.origin}`)
                    .addTo(map);
            }
        });
    }

    // Load JSON data and add markers
    fetch('./resources/vegetables.json')
        .then(response => response.json())
        .then(addMarkers)
        .catch(error => console.error('Error loading JSON:', error));
});
// Wait for the DOM to be fully loaded before executing the code - to avoid any unloaded resources problems
document.addEventListener("DOMContentLoaded", function () {
    
    // Selecting elements from the DOM using jQuery - this will allow us to tag
    var productDetails = $('#productDescription');
    var productFootprint = $('#productFootprint');
    var carbonDetails = $('#carbonDetails');

    // Extracting the 'name' parameter from the URL query string
    var urlParams = new URLSearchParams(window.location.search);
    var productName = urlParams.get('name');

    // We use the product's name from our URL (which we specified in script.html) to find the other attributes of the product, it serves us as an id

    // Check if the 'name' parameter is present in the URL
    if (productName) {
        // Fetching data from a JSON file
        $.getJSON("./resources/vegetables.json", function(result) {
            // Find the product in the JSON data based on the 'productName'
            var product = result.find(item => item.product_name === productName);

            // Check if the product is found
            if (product) {
                // Product Details Section

                // Appending product details to the productDetails element
                productDetails.append(`<h1>${product.product_name}</h1>`);
                productDetails.append(`<img src="${product.image}" alt="${product.product_name}" style="border-radius: 20px;">`);
                productDetails.append(`<p><strong>🏣 Magasin:</strong> Carrefour</p>`);
                productDetails.append(`<p><strong>⛰️ Origine:</strong> ${product.origin}</p>`);

                // Display star rating if available based on the product's rank, a rank that we advised during our web scraping.
                if (product.rank) {
                    productDetails.append(`<div class="star-rating">`);
                    for (let i = 0; i < product.rank; i++) {
                        productDetails.append(`<a class="star">&#9733;</a>`);
                    }
                    productDetails.append(`</div>`);
                }

                // Display price information
                if (!product.unit_price) {
                    product.unit_price = "";
                }
                productDetails.append(`<p><strong>💸 Prix:</strong> ${product.price} € (${product.unit_price}) </p>`);

                // Display distance information with colored emoji based on transport color - the higher the colour (green), the better it is for the environ
                var distance_colour = "";
                switch(product.transport_color) {
                    case 'green':
                        distance_colour = "🟢";
                        break;
                    case 'orange':
                        distance_colour = "🟠";
                        break;
                    case 'yellow':
                        distance_colour = "🟡";
                        break;
                    case 'red':
                        distance_colour = "🔴";
                        break;
                    default:
                        break;
                }
                productDetails.append(`<p><strong>🚚 Distance:</strong> ${product.distance} km ${distance_colour}</p>`);

                // Display bio information
                if (product.bio) {
                    product.bio = "Oui";
                } else {
                    product.bio = "Non";
                }
                productDetails.append(`<p><strong>🌱 Bio:</strong> ${product.bio}</p>`);

                // Display a link to the product
                productDetails.append(`<a href="${product.link}" target="_blank" class="link"><strong>🔗 Lien du produit</strong></a>`);

                // Product Footprint Section

                // This displays the percentage of CO2 caused by each category

                // Display the product category
                productFootprint.append(`<h1>Catégorie: <br></h1><h2>${product.category}</h2>`);

                // Display progress bars for different carbon footprint categories
                var current_percentage = (product.agriculture / product.carbon_footprint).toFixed(1) * 100;
                productFootprint.append(`
                    <div class="progress-container">
                        <div class="progress-name"><strong>🌾 Agriculture</strong></div>
                        <div class="progress-bar">
                            <div class="progress-percentage" percentage="${current_percentage}%" style="max-width:${current_percentage}%"></div>
                        </div>
                    </div>
                `);

                current_percentage = (product.transformation / product.carbon_footprint).toFixed(1) * 100;

                productFootprint.append(`
                <div class="progress-container">
                    <div class="progress-name"><strong>🏭 Transformation</strong></div>
                    <div class="progress-bar">
                        <div class="progress-percentage" percentage="${current_percentage}%" style="max-width:${current_percentage}%"></div>
                    </div>
                </div>
                `);

                current_percentage = (product.packaging / product.carbon_footprint).toFixed(1) * 100;

                productFootprint.append(`
                <div class="progress-container">
                    <div class="progress-name"><strong>📦 Emballage</strong></div>
                    <div class="progress-bar">
                        <div class="progress-percentage" percentage="${current_percentage}%" style="max-width:${current_percentage}%"></div>
                    </div>
                </div>
                `);

                current_percentage = (product.transport / product.carbon_footprint).toFixed(1) * 100;

                productFootprint.append(`
                <div class="progress-container">
                    <div class="progress-name"><strong>🚚 Transport</strong></div>
                    <div class="progress-bar">
                        <div class="progress-percentage" percentage="${current_percentage}%" style="max-width:${current_percentage}%"></div>
                    </div>
                </div>
                `);

                current_percentage = (product.distribution / product.carbon_footprint).toFixed(1) * 100;
                
                productFootprint.append(`
                <div class="progress-container">
                    <div class="progress-name"><strong>🏬 Distribution</strong></div>
                    <div class="progress-bar">
                        <div class="progress-percentage" percentage="${current_percentage}%" style="max-width:${current_percentage}%"></div>
                    </div>
                </div>
                `);

                current_percentage = (product.consommation / product.carbon_footprint).toFixed(1) * 100;

                productFootprint.append(`
                <div class="progress-container">
                    <div class="progress-name"><strong>🍽️ Consommation</strong></div>
                    <div class="progress-bar">
                        <div class="progress-percentage" percentage="${current_percentage}%" style="max-width:${current_percentage}%"></div>
                    </div>
                </div>
                `);

                // Display total carbon footprint per kg of the product
                productFootprint.append(`<h3><strong>🌍 Empreinte carbone:</strong><br> <strong>${parseFloat(product.carbon_footprint).toFixed(2)}kg</strong> CO2 eq/kg de produit</h3>`);

                // Carbon Details Section

                // Display a link to a page with more details about carbon footprint
                carbonDetails.append(`<a href="description.html?name=${encodeURIComponent(product.product_name)}" class="button">Qu'est ce que ca veut dire?</a>`);
            } else {
                // If it is not, we display a message if the product is not found
                productDetails.append('<p>Product not found</p>');
            }
        });
    } else {
        // Display a message if no product name is provided in the URL
        productDetails.append('<p>No product name provided</p>');
    }
});

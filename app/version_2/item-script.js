document.addEventListener("DOMContentLoaded", function () {
    var productDetails = $('#productDescription');
    var productFootprint = $('#productFootprint');
    var carbonDetails = $('#carbonDetails');

    var urlParams = new URLSearchParams(window.location.search);
    var productName = urlParams.get('name');

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

                productDetails.append(`<a href="${product.link}" target="_blank" class="link"><strong>🔗 Lien du produit</strong></a>`);

                // Product Footprint

                productFootprint.append(`<h1>Catégorie: <br></h1><h2>${product.category}</h2>`);

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

                productFootprint.append(`<h3><strong>🌍 Empreinte carbone:</strong><br> <strong>${parseFloat(product.carbon_footprint).toFixed(2)}kg</strong> CO2 eq/kg de produit</h3>`);

                carbonDetails.append(`<a href="description.html?name=${encodeURIComponent(product.product_name)}" class="button">Qu'est ce que ca veut dire?</a>`);
            } else {
                productDetails.append('<p>Product not found</p>');
            }
        });
    } else {
        productDetails.append('<p>No product name provided</p>');
    }
});
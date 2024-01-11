// itemDetails.js

document.addEventListener('DOMContentLoaded', function () {
    // Get item details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    const itemName = urlParams.get('name');
    itemImage = urlParams.get('image');
    const itemOrigine = urlParams.get('origine');
    const itemPrice = urlParams.get('price');
    const itemUnitPrice = urlParams.get('unitPrice');
    const itemProductLink = urlParams.get('productLink');
    const itemVegetableName = urlParams.get('vegetableName');
    const itemDistance = urlParams.get('distance');
    const itemAgriculture = urlParams.get('agriculture');
    const itemTransformation = urlParams.get('transformation');
    const itemEmballage = urlParams.get('emballage');
    const itemTransport = urlParams.get('transport');
    const itemDistribution = urlParams.get('distribution');
    const itemConsommation = urlParams.get('consommation');
    const itemCarbonFootprint = urlParams.get('carbonfootprint');

    // Display item details on the page
    const itemNameElement = document.getElementById('itemName');
    const itemImageElement = document.getElementById('itemImage');
    const itemOrigineElement = document.getElementById('itemOrigine');
    const itemPriceElement = document.getElementById('itemPrice');
    const itemUnitPriceElement = document.getElementById('itemUnitPrice');
    const itemProductLinkElement = document.getElementById('itemProductLink');
    const itemVegetableNameElement = document.getElementById('itemVegetableName');
    const itemDistanceElement = document.getElementById('itemDistance');
    const itemAgricultureElement = document.getElementById('itemAgriculture');
    const itemTransformationElement = document.getElementById('itemTransformation');
    const itemEmballageElement = document.getElementById('itemEmballage');
    const itemTransportElement = document.getElementById('itemTransport');
    const itemDistributionElement = document.getElementById('itemDistribution');
    const itemConsommationElement = document.getElementById('itemConsommation');
    const itemCarbonFootprintElement = document.getElementById('itemCarbonFootprint');
    
    itemNameElement.textContent = itemName || 'Item Name';
    itemOrigineElement.textContent = itemOrigine.charAt(0).toUpperCase() + itemOrigine.slice(1).toLowerCase() || 'Origine';
    itemPriceElement.textContent = itemPrice + '€' || 'Price';
    itemUnitPriceElement.textContent = itemUnitPrice || 'Unit Price';
    itemProductLinkElement = itemProductLink || 'Product Link';
    itemVegetableNameElement.textContent = itemVegetableName || 'Vegetable Name';
    itemDistanceElement.textContent = itemDistance || 'Distance';
    itemAgricultureElement.textContent = itemAgriculture || 'Agriculture';
    itemTransformationElement.textContent = itemTransformation || 'Transformation';
    itemEmballageElement.textContent = itemEmballage || 'Emballage';
    itemTransportElement.textContent = itemTransport || 'Transport';
    itemDistributionElement.textContent = itemDistribution || 'Distribution';
    itemConsommationElement.textContent = itemConsommation || 'Consommation';
    itemCarbonFootprintElement.textContent = itemCarbonFootprint || 'Carbon Footprint';

    // Set the src attribute of the itemImageElement
    itemImageElement.src = itemImage || 'default_picture.jpg'; // Provide a default image URL if not available
    itemImageElement.alt = itemName || 'Item Image';

    // Load and parse the CSV file
    Papa.parse('resources/vegetables.csv', {
        download: true,
        header: true,
        complete: function (result) {
            const data = result.data;

            // Find the matching item in the CSV data
            const matchingItem = data.find(item => (item.Nom || '').toLowerCase() === (itemName || '').toLowerCase());

            if (matchingItem) {
                // Display additional information from the CSV
                itemStoreElement.textContent = matchingItem.Magasin || 'N/A';
                itemOrigineElement.textContent = matchingItem.Origine || 'N/A';
                itemPriceElement.textContent = matchingItem.Prix || 'N/A';
                itemProductLinkElement.href = matchingItem['Lien vers le produit'] || '#';
                itemProductLinkElement.textContent = 'Lien'; // You can customize the link text
            } else {
                // Handle the case where the item is not found in the CSV
                itemStoreElement.textContent = 'N/A';
                itemOrigineElement.textContent = 'N/A';
                itemPriceElement.textContent = 'N/A';
                itemProductLinkElement.href = '#';
                itemProductLinkElement.textContent = 'Lien';
            }
        }
    });
});

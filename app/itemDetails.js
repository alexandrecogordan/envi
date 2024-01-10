// itemDetails.js

document.addEventListener('DOMContentLoaded', function () {
    // Get item details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get('name');
    const itemImage = urlParams.get('image');
    const itemDescription = urlParams.get('description');

    // Display item details on the page
    const itemNameElement = document.getElementById('itemName');
    const itemImageElement = document.getElementById('itemImage');
    const itemDescriptionElement = document.getElementById('itemDescription');
    const itemStoreElement = document.getElementById('itemStore');
    const itemPriceElement = document.getElementById('itemPrice');
    const itemProductLinkElement = document.getElementById('itemProductLink');

    itemNameElement.textContent = itemName || 'Item Name';

    // Set the src attribute of the itemImageElement
    itemImageElement.src = itemImage || 'default_image_url.jpg'; // Provide a default image URL if not available
    itemImageElement.alt = itemName || 'Item Image';

    itemDescriptionElement.textContent = itemDescription || 'No description available.';

    // Load and parse the CSV file
    Papa.parse('resources/your_csv_file.csv', {
        download: true,
        header: true,
        complete: function (result) {
            const data = result.data;

            // Find the matching item in the CSV data
            const matchingItem = data.find(item => (item.Nom || '').toLowerCase() === (itemName || '').toLowerCase());

            if (matchingItem) {
                // Display additional information from the CSV
                itemStoreElement.textContent = matchingItem.Magasin || 'N/A';
                itemPriceElement.textContent = matchingItem.Prix || 'N/A';
                itemProductLinkElement.href = matchingItem['Lien vers le produit'] || '#';
                itemProductLinkElement.textContent = 'Lien'; // You can customize the link text
            } else {
                // Handle the case where the item is not found in the CSV
                itemStoreElement.textContent = 'N/A';
                itemPriceElement.textContent = 'N/A';
                itemProductLinkElement.href = '#';
                itemProductLinkElement.textContent = 'Lien';
            }
        }
    });
});

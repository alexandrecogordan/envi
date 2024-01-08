document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm !== '') {
            // Load and parse the CSV file
            Papa.parse('resources/vegetables.csv', {
                download: true,
                header: true, // Treat the first row as header
                complete: function (result) {
                    const data = result.data;

                    // Search for the entered term in the "Nom" column
                    const matchingItems = data.filter(item => {
                        const itemName = (item.Nom || '').toLowerCase(); // Ensure 'Nom' is defined
                        return itemName.includes(searchTerm);
                    });

                    // Display the images of matching items
                    displayMatchingImages(matchingItems);
                }
            });
        }
    });

    function displayMatchingImages(matchingItems) {
        // Clear previous results
        const resultList = document.getElementById('resultList');
        resultList.innerHTML = '';

        if (matchingItems.length > 0) {
            // Create and append list items with images
            matchingItems.forEach(item => {
                const listItem = document.createElement('li');
                const image = document.createElement('img');
                image.src = item.Image || ''; // Ensure 'Image' is defined
                image.alt = item.Nom || ''; // Ensure 'Nom' is defined
                listItem.appendChild(image);
                resultList.appendChild(listItem);
            });
        } else {
            // No matching items found
            alert('No matching items found.');
        }
    }
});

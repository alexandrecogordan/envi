document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('suggestionsContainer');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        performSearch();
    });

    searchInput.addEventListener('input', function () {
        updateSuggestions();
    });

    function updateSuggestions() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm !== '') {
            Papa.parse('resources/vegetables.csv', {
                download: true,
                header: true,
                complete: function (result) {
                    const data = result.data;

                    const matchingSuggestions = data
                        .filter(item => item.Nom.toLowerCase().includes(searchTerm))
                        .map(item => item.Nom);

                    displaySuggestions(matchingSuggestions);
                }
            });
        } else {
            suggestionsContainer.innerHTML = ''; // Clear suggestions if the search term is empty
        }
    }

    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

        if (suggestions.length > 0) {
            // Create and append suggestion items
            suggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = suggestion;
                suggestionItem.addEventListener('click', function () {
                    searchInput.value = suggestion;
                    suggestionsContainer.innerHTML = ''; // Clear suggestions after selecting one
                    performSearch();
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        } else {
            suggestionsContainer.innerHTML = ''; // Clear suggestions if there are no matches
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm !== '') {
            Papa.parse('resources/vegetables.csv', {
                download: true,
                header: true,
                complete: function (result) {
                    const data = result.data;

                    const matchingItems = data.filter(item => {
                        const itemName = (item.Nom || '').toLowerCase(); // Ensure 'Nom' is defined
                        return itemName.includes(searchTerm);
                    });

                    displayMatchingImages(matchingItems);
                }
            });
        }
    }

    function displayMatchingImages(matchingItems) {
        const resultList = document.getElementById('resultList');
        resultList.innerHTML = '';

        if (matchingItems.length > 0) {
            matchingItems.forEach(item => {
                const listItem = document.createElement('li');
                const image = document.createElement('img');
                image.src = item.Image || '';
                image.alt = item.Nom || '';
                listItem.appendChild(image);
                resultList.appendChild(listItem);
            });
        } else {
            alert('No matching items found.');
        }
    }


    function displayMatchingImages(matchingItems) {
        const resultList = document.getElementById('resultList');
        resultList.innerHTML = '';

        if (matchingItems.length > 0) {
            matchingItems.forEach(item => {
                const listItem = document.createElement('li');
                const image = document.createElement('img');
                image.src = item.Image || '';
                image.alt = item.Nom || '';

                // Add click event to navigate to item details page
                listItem.addEventListener('click', function () {
                    navigateToItemDetails(item);
                });

                listItem.appendChild(image);
                resultList.appendChild(listItem);
            });
        } else {
            alert('No matching items found.');
        }
    }

    function navigateToItemDetails(item) {
        // Construct the URL for the itemDetails.html page with parameters
        const detailsUrl = `itemDetails.html?name=${encodeURIComponent(item.Nom)}&image=${encodeURIComponent(item.Image)}&description=${encodeURIComponent(item.Description || '')}`;

        // Navigate to the new page
        window.location.href = detailsUrl;
    }
});

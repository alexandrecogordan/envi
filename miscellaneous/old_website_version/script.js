document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        performSearch();
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm !== '') {
            Papa.parse('resources/vegetables.csv', {
                download: true,
                header: true,
                complete: function (result) {
                    const data = result.data;

                    const matchingItems = data.filter(item => {
                        const itemName = (item.Nom || '').toLowerCase();
                        const itemVegetableName = (item.nom_legume || '').toLowerCase();
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
        const detailsUrl = `itemDetails.html?name=${encodeURIComponent(item.Nom)}&image=${encodeURIComponent(item.Image)}&origine=${encodeURIComponent(item.Origine)}&price=${encodeURIComponent(item.Prix)}&unitPrice=${encodeURIComponent(item.PrixUnite)}&productLink=${encodeURIComponent(item.Lien)}&vegetableName=${encodeURIComponent(item.Nom_legume)}&distance=${encodeURIComponent(item.Distance)}&agriculture=${encodeURIComponent(item.Agriculture)}&transformation=${encodeURIComponent(item.Transformation)}&emballage=${encodeURIComponent(item.Emballage)}&transport=${encodeURIComponent(item.Transport)}&distribution=${encodeURIComponent(item.Distribution)}&consommation=${encodeURIComponent(item.Consommation)}&carbonfootprint=${encodeURIComponent(item.CarbonFootprint)}`;

        // Navigate to the new page
        window.location.href = detailsUrl;
    }
});

// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
    // Initialize an empty array to store data from JSON
    var data = [];
    // Use a Set to store unique suggestions for autocomplete
    var suggestionsSet = new Set();

    // Fetch JSON data and populate the 'data' array
    $.getJSON("./resources/vegetables.json", function(result) {
        // Iterate through the JSON data and add items to 'data' array and suggestions set
        $.each(result, function(index, table) {
            data.push(table);
            suggestionsSet.add(table.vegetable_name);
        });

        // Convert Set to array to use as autocomplete suggestions
        var suggestions = Array.from(suggestionsSet);

        // Initialize the jQuery UI Autocomplete on the search input
        $("#searchInput").autocomplete({
            source: suggestions,
            select: function(event, ui) {
                event.preventDefault();
                // Handle selection from autocomplete
                displayIndexResult(ui.item.value);
            }
        });

        // Handle keypress event on the search input
        $('#searchInput').on('keypress', function (event) {
            if (event.which === 13) {
                event.preventDefault();
                // On Enter key, check if the input is a link or a search term
                var input_value = $(this).val();
                var link = data.find(found_item => found_item.link === input_value);
                var search = data.find(found_item => found_item.link === input_value);

                if (link) {
                    // If it's a link, navigate to item details
                    navigateToItemDetails(link);
                }
                if(search){
                    // If it's a search term, perform search-related action
                    // (Note: Add specific actions based on your requirements)
                }
            }
        });
    });

    // Function to display search results in the index
    function displayIndexResult(vegetableName) {
        var resultList = $('#resultList');
        resultList.empty();

        // Filter data based on the selected vegetableName
        var filteredData = data.filter(item => item.vegetable_name === vegetableName);

        // Iterate through filtered data and create list items
        filteredData.forEach(item => {
            var listItem = $('<li>');
            var link = $('<a>').attr('href', `item.html?name=${encodeURIComponent(item.product_name)}`);
            var image = $('<img>').attr('src', item.image).attr('alt', item.vegetable_name).addClass('item-image');
            
            // Truncate the product name for display
            var truncatedText = item.product_name.length > 25 
                ? item.product_name.substring(0, 25) + '...'
                : item.product_name;

            var name = $('<p>').text(truncatedText).addClass('list-text');

            // Add click event to navigate to item details
            listItem.on('click', function () {
                navigateToItemDetails(item);
            });
            
            link.append(image);
            listItem.append(link);
            listItem.append(name);
            resultList.append(listItem);
        });
    }

    // Function to navigate to item details page
    function navigateToItemDetails(item) {
        const detailsUrl = `item.html?name=${encodeURIComponent(item.product_name)}`;
        window.location.href = detailsUrl;
    }
});

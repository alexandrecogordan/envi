document.addEventListener("DOMContentLoaded", function () {
    var data = [];
    var suggestionsSet = new Set();

    // Fetch JSON data and populate the 'data' array
    $.getJSON("./resources/vegetables.json", function(result) {
        $.each(result, function(index, table) {
            data.push(table);
            suggestionsSet.add(table.vegetable_name);
        });

        var suggestions = Array.from(suggestionsSet);

        $( "#searchInput" ).autocomplete({
            source: suggestions,
            select: function(event, ui) {
                event.preventDefault();
                displayIndexResult(ui.item.value);
            }
        });

        $('#searchInput').on('keypress', function (event) {
            if (event.which === 13) {
                event.preventDefault();
                
                var input_value = $(this).val();
                var link = data.find(found_item => found_item.link === input_value);
                var search = data.find(found_item => found_item.link === input_value);

                if (link) {
                    navigateToItemDetails(link);
                }
                if(search){
                    // Do the thing to show the values in a search manner.
                }
            }
        });
    });

    function displayIndexResult(vegetableName) {
        var resultList = $('#resultList');
        resultList.empty();

        var filteredData = data.filter(item => item.vegetable_name === vegetableName);

        filteredData.forEach(item => {
            var listItem = $('<li>');
            var link = $('<a>').attr('href', `item.html?name=${encodeURIComponent(item.product_name)}`);
            var image = $('<img>').attr('src', item.image).attr('alt', item.vegetable_name).addClass('item-image'); // Add CSS class 'item-image' to the image element
            
            var truncatedText = item.product_name.length > 25 
            ? item.product_name.substring(0, 25) + '...'
            : item.product_name;

            var name = $('<p>').text(truncatedText).addClass('list-text');

            listItem.on('click', function () {
                navigateToItemDetails(item);
            });
            
            link.append(image);
            listItem.append(link);
            listItem.append(name);
            resultList.append(listItem);
        });
    }

    function navigateToItemDetails(item) {
        const detailsUrl = `item.html?name=${encodeURIComponent(item.product_name)}`

        window.location.href = detailsUrl;
    }
});
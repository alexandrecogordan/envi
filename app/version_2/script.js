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
    });

    function displayIndexResult(vegetableName) {
        var resultList = $('#resultList');
        resultList.empty();

        var filteredData = data.filter(item => item.vegetable_name === vegetableName);

        filteredData.forEach(item => {
            var listItem = $('<li>');
            var link = $('<a>').attr('href', `item.html?name=${encodeURIComponent(item.product_name)}`);
            var image = $('<img>').attr('src', item.image).attr('alt', item.vegetable_name);
            
            var truncatedText = item.product_name.length > 20  // Adjust 20 to your desired character limit
            ? item.product_name.substring(0, 30) + '...'  // Use ellipsis if text is truncated
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
});
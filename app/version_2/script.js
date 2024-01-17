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
                
                var direct_link = $(this).val();

                var item = data.find(item => item.link === direct_link);

                console.log(item)

                navigateToItemDetails(item);
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
            var direct_link = 'https://www.carrefour.fr/p/avocats-bio-hass-3523680411289'
            
            var truncatedText = item.product_name.length > 20 
            ? item.product_name.substring(0, 30) + '...'
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
        const detailsUrl = `itemDetails.html?name=${encodeURIComponent(item.Nom)}&image=${encodeURIComponent(item.Image)}&origine=${encodeURIComponent(item.Origine)}&price=${encodeURIComponent(item.Prix)}&unitPrice=${encodeURIComponent(item.PrixUnite)}&productLink=${encodeURIComponent(item.Lien)}&vegetableName=${encodeURIComponent(item.Nom_legume)}&distance=${encodeURIComponent(item.Distance)}&agriculture=${encodeURIComponent(item.Agriculture)}&transformation=${encodeURIComponent(item.Transformation)}&emballage=${encodeURIComponent(item.Emballage)}&transport=${encodeURIComponent(item.Transport)}&distribution=${encodeURIComponent(item.Distribution)}&consommation=${encodeURIComponent(item.Consommation)}&carbonfootprint=${encodeURIComponent(item.CarbonFootprint)}`;

        window.location.href = detailsUrl;
    }
});
$(document).ready(function () {
    // Load CSV data
    $.ajax({
        type: "GET",
        url: "casino.csv",
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });
});

function processData(allText) {
    // Split CSV into rows
    var allRows = allText.split(/\r?\n|\r/);
    var tableData = [];

    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        // Split each row into columns
        var rowCells = allRows[singleRow].split(',');

        // Add data to the table
        tableData.push(rowCells);
    }

    // Render the table
    renderTable(tableData);
}

function renderTable(data) {
    var productTable = "<table class='table'><thead><tr><th>Name</th><th>Image Link</th><th>Origin</th><th>Price</th><th>Unit Price</th><th>Bio</th></tr></thead><tbody>";

    for (var i = 1; i < data.length; i++) {
        productTable += "<tr>";
        for (var j = 0; j < data[i].length; j++) {
            productTable += "<td>" + data[i][j] + "</td>";
        }
        productTable += "</tr>";
    }

    productTable += "</tbody></table>";

    // Display the table
    $("#product-list").html(productTable);
}

document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var productName = urlParams.get('name');
    
    const all_countries = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"]
    
    var informaton = $('#information');

    const countryCode = {
        "Espagne": ["ES"],
        "Israel": ["IL"],
        "France": ["FR"],
        "Perou": ["PE"],
        "Italie": ["IT"],
        "Rwanda": ["RW"],
        "Senegal": ["SN"],
        "Maroc": ["MA"],
        "Republique dominicaine": ["DO"],
        "Colombie": ["CO"],
        "Pays-bas": ["NL"],
        "Pologne": ["PL"],
        "Canada": ["CA"],
        "Afrique du sud": ["ZA"], 
        "Belgique": ["BE"],
        "Portugal": ["PT"],
        "Inde": ["IN"],
        "Origine ue et hors u.e.": all_countries,
        "Origine pays tiers": ["AL", "DZ", "AR", "AU", "BR", "CA", "CN", "EG", "IN", "JP", "KR", "MA", "MX", "RU", "SA", "SG", "TN", "UA", "US", "ZA"],
        "Origine c.e.e.": ["AT", "BE", "BG", "CY", "HR", "DE", "DK", "ES", "EE", "FI", "FR", "GR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK", "UK", "CH", "TR"],
        "Union europeenne": ["AT", "BE", "BG", "CY", "HR", "DE", "DK", "ES", "EE", "FI", "FR", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "CZ", "RO", "SK", "SI", "SE"],
        "Ue et hors u.e.": all_countries
    };

    if (productName) {
        $.getJSON("./resources/vegetables.json", function(result) {
            var product = result.find(item => item.product_name === productName);

            if (product) {
                window.onload = function() {
                    var countriesToFill = countryCode[product.origin];
                    
                    countriesToFill.forEach(function(countryCode) {
                        var country = document.querySelector("#" + countryCode);
                        if (country) {
                            country.style.fill = '#B71A1A';
                            // country.style.fill = product.transport_color;
                        }
                    });
                };
            };

            informaton.append(`
                <h1>${(parseFloat(product.carbon_footprint).toFixed(2))}kg de carbon, c’est quoi?</h1>
                <ul>
                    <li>Une ampoule basse consommation pendant ${Math.round(product.carbon_footprint / 0.01)} jours
                    <li>La conduite d’une petite voiture sur environ ${Math.round(product.carbon_footprint / 0.24)} km
                    <li>${Math.round(product.carbon_footprint / 0.0002)} charges complète de votre smartphone (soit ${Math.round(product.carbon_footprint / 0.0002 / 365)} ans de recharge quotidienne)
                    <li>${Math.round(product.carbon_footprint / 0.008)} feuilles de papier A4
                    <li>Une douche de ${Math.round(product.carbon_footprint / 0.02)} minutes
                </ul>
            `);
        });
    }
});
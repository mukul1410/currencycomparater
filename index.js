$(document).ready(function() {
    $.support.cors = true;
    var currencyInfo;
    var currentRates;
    var autocompleteSrc = ["USD (US Dollar) ", "CAD (Canadian Dollar) ", "EUR (Euro) ", "AED (United Arab Emirates Dirham) ", "AFN (Afghan Afghani) ", "ALL (Albanian Lek) ", "AMD (Armenian Dram) ", "ARS (Argentine Peso) ", "AUD (Australian Dollar) ", "AZN (Azerbaijani Manat) ", "BAM (Bosnia-Herzegovina Convertible Mark) ", "BDT (Bangladeshi Taka) ", "BGN (Bulgarian Lev) ", "BHD (Bahraini Dinar) ", "BIF (Burundian Franc) ", "BND (Brunei Dollar) ", "BOB (Bolivian Boliviano) ", "BRL (Brazilian Real) ", "BWP (Botswanan Pula) ", "BYR (Belarusian Ruble) ", "BZD (Belize Dollar) ", "CDF (Congolese Franc) ", "CHF (Swiss Franc) ", "CLP (Chilean Peso) ", "CNY (Chinese Yuan) ", "COP (Colombian Peso) ", "CRC (Costa Rican Colón) ", "CVE (Cape Verdean Escudo) ", "CZK (Czech Republic Koruna) ", "DJF (Djiboutian Franc) ", "DKK (Danish Krone) ", "DOP (Dominican Peso) ", "DZD (Algerian Dinar) ", "EEK (Estonian Kroon) ", "EGP (Egyptian Pound) ", "ERN (Eritrean Nakfa) ", "ETB (Ethiopian Birr) ", "GBP (British Pound Sterling) ", "GEL (Georgian Lari) ", "GHS (Ghanaian Cedi) ", "GNF (Guinean Franc) ", "GTQ (Guatemalan Quetzal) ", "HKD (Hong Kong Dollar) ", "HNL (Honduran Lempira) ", "HRK (Croatian Kuna) ", "HUF (Hungarian Forint) ", "IDR (Indonesian Rupiah) ", "ILS (Israeli New Sheqel) ", "INR (Indian Rupee) ", "IQD (Iraqi Dinar) ", "IRR (Iranian Rial) ", "ISK (Icelandic Króna) ", "JMD (Jamaican Dollar) ", "JOD (Jordanian Dinar) ", "JPY (Japanese Yen) ", "KES (Kenyan Shilling) ", "KHR (Cambodian Riel) ", "KMF (Comorian Franc) ", "KRW (South Korean Won) ", "KWD (Kuwaiti Dinar) ", "KZT (Kazakhstani Tenge) ", "LBP (Lebanese Pound) ", "LKR (Sri Lankan Rupee) ", "LTL (Lithuanian Litas) ", "LVL (Latvian Lats) ", "LYD (Libyan Dinar) ", "MAD (Moroccan Dirham) ", "MDL (Moldovan Leu) ", "MGA (Malagasy Ariary) ", "MKD (Macedonian Denar) ", "MMK (Myanma Kyat) ", "MOP (Macanese Pataca) ", "MUR (Mauritian Rupee) ", "MXN (Mexican Peso) ", "MYR (Malaysian Ringgit) ", "MZN (Mozambican Metical) ", "NAD (Namibian Dollar) ", "NGN (Nigerian Naira) ", "NIO (Nicaraguan Córdoba) ", "NOK (Norwegian Krone) ", "NPR (Nepalese Rupee) ", "NZD (New Zealand Dollar) ", "OMR (Omani Rial) ", "PAB (Panamanian Balboa) ", "PEN (Peruvian Nuevo Sol) ", "PHP (Philippine Peso) ", "PKR (Pakistani Rupee) ", "PLN (Polish Zloty) ", "PYG (Paraguayan Guarani) ", "QAR (Qatari Rial) ", "RON (Romanian Leu) ", "RSD (Serbian Dinar) ", "RUB (Russian Ruble) ", "RWF (Rwandan Franc) ", "SAR (Saudi Riyal) ", "SDG (Sudanese Pound) ", "SEK (Swedish Krona) ", "SGD (Singapore Dollar) ", "SOS (Somali Shilling) ", "SYP (Syrian Pound) ", "THB (Thai Baht) ", "TND (Tunisian Dinar) ", "TOP (Tongan Paʻanga) ", "TRY (Turkish Lira) ", "TTD (Trinidad and Tobago Dollar) ", "TWD (New Taiwan Dollar) ", "TZS (Tanzanian Shilling) ", "UAH (Ukrainian Hryvnia) ", "UGX (Ugandan Shilling) ", "UYU (Uruguayan Peso) ", "UZS (Uzbekistan Som) ", "VEF (Venezuelan Bolívar) ", "VND (Vietnamese Dong) ", "XAF (CFA Franc BEAC) ", "XOF (CFA Franc BCEAO) ", "YER (Yemeni Rial) ", "ZAR (South African Rand) ", "ZMK (Zambian Kwacha)"];
    currencyInfo = getCurrencyInfo();
    setTimeout(function() {
        $.ajax({
            url: url,
            type: "GET",
            crossDomain: true,
            dataType: "jsonp",
            success: function(data) {

                currentRates = data;
            }

        });

    }, 1000);

    setInterval(function() {
        $.ajax({
            url: url,
            type: "GET",
            crossDomain: true,
            dataType: "jsonp",
            success: function(data) {

                currentRates = data;
            }

        });

    }, 900000);
    var appId = "9c6981520f224175a79f7008a46ccfdf";
    var url = "http://openexchangerates.org/api/latest.json?app_id=" + appId;

    $.getJSON(url, callbackFuncWithData);

    function callbackFuncWithData(data) {
        currentRates = data;
    }
    $("#baseCurrency").autocomplete({
        source: autocompleteSrc,
        select: function(event, ui) {

            var item = ui.item.value;
            var index = item.indexOf("(");
            var code = item.substring(0, index).trim();
            var str = "<span><div id='baseVal' class='sibling'><input type='number' step = any min=0 class='currrencyVal' value='10'></input></div>";
            str += "<div id='baseCurCode' class='sibling'><h1>" + code + "</h1></div></span>";
            $('#baseResult').html(str);

            var base = $(document).find("#baseCurCode h1").html();
            var baseVal = $(document).find("#baseVal input").val();
            $(document).find('.comparisionCurVal').each(function() {
                var valInUSD = baseVal / currentRates["rates"][base];
                var code = $(this).find(".sibling h1").html();
                var value = Number(valInUSD) * Number(currentRates["rates"][code]);
                $(this).find(".sibling input").val(Math.round(value * 100) / 100);
                $(this).find(".sibling a").attr('alt', base);
            });
        }
    });


    $("#comparisionCurrency").autocomplete({
        source: autocompleteSrc,
        select: function(event, ui) {

            var item = ui.item.value;
            var index = item.indexOf("(");
            var base = $(document).find("#baseCurCode h1").html();
            var baseVal = $(document).find("#baseVal input").val();
            if (!baseVal || !base) {
                alert("Enter base Currency First");
                this.value = "";
                return false;
            } else {

                var valInUSD = baseVal / currentRates["rates"][base];
                var dataURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAFpJREFUOE9jZMAB0tLS/sOkZs2axYhLHeXiIJuIxRi2EasR2TuUOxlmAjG247SNKppTUlISQAah03j9C7MZ5DSYQmR6VDNapMECjKLQxhff+BLJAgIJZQGyZgD0UOewFEz0UQAAAABJRU5ErkJggg==";

                var code = item.substring(0, index).trim();
                var value = Number(valInUSD) * Number(currentRates["rates"][code]);

                var selector = "span.comparisionCurVal#" + code;

                if ($(selector).length == 0) {
                    var str = "<span class='comparisionCurVal' id='" + code + "'><div class='sibling'><input type='number' step = any min=0 max = 150000000 class='currrencyVal' value='" + Math.round(value * 100) / 100 + "'></input></div>";
                    str += "<div class='sibling'><h1>" + code + "</h1></div>";
                    str += "<div class='sibling'><div class='link' ><a href='#' id='" + code + "' alt='" + base + "' >Year-wise Chart</a></div></div>";
                    str += "<div class= 'sibling'> <img src='" + dataURI + "'width='20px' alt='" + code + "'/></div></span>";
                    $('#comparisionResult').append(str);
                }
                this.value = "";
                return false;
            }

        }
    });

    $(document).on("change", "#baseVal", function() {
        changeVals(currentRates, "");
    });

    $(document).on("change", ".comparisionCurVal", function() {
        var base = $(document).find("#baseCurCode h1").html();
        var baseVal = $(document).find("#baseVal input").val();
        var code = $(this).find('.sibling h1').html();
        var value = $(this).find('.sibling input').val();

        var valInUSD = value / currentRates["rates"][code];
        var value = Number(valInUSD) * Number(currentRates["rates"][base]);
        $(document).find("#baseVal input").val(Math.round(value * 100) / 100);
        changeVals(currentRates, this);
    });



    $(document).on("keyup", ".sibling input", function(e) {

        if ($(this).val().length == 0) {
            alert("Please enter only numbers");
            $(this).val(0);
        }
    });
    $(document).on("click", ".sibling img", function() {
        var id = $(this).attr('alt');
        var selector = "span.comparisionCurVal#" + id;

        $(selector).remove();
    });

    $(document).on("click", ".sibling a", function() {
        var base = $(this).attr('alt');
        var compare = $(this).attr('id');
        var content = base + " v/s " + compare + " year wise";
        $('#chartImgContent p').html(content);
        var id = base + compare;
        var chartURL = "https://www.google.com/finance/chart?espv=2&biw=1366&bih=643&q=CURRENCY:" + id + "&tkr=1&p=5Y&chst=vkc&chs=229x94&chsc=1&ei=izyMVIakOJKiugTR_IKICQ";
        $('#chartImg').attr('src', chartURL);
        $.colorbox({
            width: '40%',
            height: screen.availHeight * 0.4,
            href: '#chartImgContent',
            inline: true
        });
        return false;
    });

}); //end ready

function getCurrencyInfo() {

    var currencyInfo;

    var url = "currency.json";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: false,
        error: function(e) {

        },
        success: function(data) {

            currencyInfo = data;
        }
    }); //end ajax

    return currencyInfo;
}

function changeVals(currentRates, current) {

    var base = $(document).find("#baseCurCode h1").html();
    var baseVal = $(document).find("#baseVal input").val();
    $(document).find('.comparisionCurVal').each(function() {
        if (this != current) {
            var valInUSD = baseVal / currentRates["rates"][base];
            var code = $(this).find(".sibling h1").html();
            var value = Number(valInUSD) * Number(currentRates["rates"][code]);
            $(this).find(".sibling input").val(Math.round(value * 100) / 100);
            $(this).find(".sibling a").attr('alt', base);
        }
    });
}
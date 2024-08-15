//Country Code script

$('#btnRun1').click(function() {

    $.ajax({
        url: "libs/php/getCountryCode.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#selLatitude').val(),
            lang: $('#selLongitude').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtLanguage').html(result['data'][0]['language']);
                $('#txtDistance').html(result['data'][0]['distance']);
                $('#txtCountryCode').html(result['data'][0]['countrycode']);
                $('#txtCountryName').html(result['data'][0]['countryname']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

//Timezone script

$('#btnRun2').click(function() {

    $.ajax({
        url: "libs/php/getTimeZone.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#selLatitude').val(),
            lang: $('#selLongitude').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtCountryCode').html(result['data'][0]['countrycode']);
                $('#txtTimezoneId').html(result['data'][0]['timezoneid']);
                $('#txtCountryName').html(result['data'][0]['countryname']);
                $('#txtTime').html(result['data'][0]['time']);
            

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

//Weather script

$('#btnRun3').click(function() {

    $.ajax({
        url: "libs/php/getWeather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#selNorth').val(),
            south: $('#selSouth').val(),
            east: $('#selEast').val(),
            west: $('#selWest').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtDateTime').html(result['data'][0]['datetime']);
                $('#txtTemperature').html(result['data'][0]['temperature']);
                $('#txtHumidity').html(result['data'][0]['humidity']);
                $('#txtStationName').html(result['data'][0]['stationname']);
            

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});
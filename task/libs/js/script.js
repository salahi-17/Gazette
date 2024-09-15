//Country Code script

$('#btnRun1').click(function() {

    $.ajax({
        url: "libs/php/getCountryCode.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#selLatitude').val(),
            lng: $('#selLongitude').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtCountryName').html(result[data]['countryName']);

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
        url: "libs/php/getTimezone.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#selLat').val(),
            lng: $('#selLong').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtTime').html(result['data']['time']);
            

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

                $('#txtStationName').html(result['data']['stationName']);
            

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});
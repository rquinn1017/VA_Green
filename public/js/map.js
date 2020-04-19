let map, infoWindow, pos;

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: 37.5407, lng: -77.4360 },
    zoom: 8
  });
  infoWindow = new google.maps.InfoWindow();

  // let locations =

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);

      let marker = new google.maps.Marker({
        map: map,
        position: pos,
        title: "You are here",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
      });

    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter(center));
  }


}

function getCompanies(){
  $.ajax({
    method: "GET",
    url: "api/companies"
  }).done(function (companies) {

    let markers = [];
    let infoWindows = [];

    for (let i = 0; i < companies.length; i++) {
      let lat = companies[i].Latitude;
      let lng = companies[i].Longitude;
      let webpage = companies[i].Website;
      if (webpage.length > 0) {
        if (webpage.substring(0, 4) !== "http") {
          webpage = "https://" + webpage
        }
        webpage = `<a href="${webpage}" target="_blank">Visit Website</a>`
      }

      markers[i] = new google.maps.Marker({
        map: map,
        position: {
          lat: lat,
          lng: lng
        },
        title: companies[i].Facility
      });
// console.log(markers)
      
      infoWindows[i] = new google.maps.InfoWindow({
        content: companies[i].Facility + `<div>${companies[i].Contact}</div>` + companies[i].Address + `<br>` + webpage
          + `<br>` + `<a href="https://www.google.com/maps/dir/My+Location/${companies[i].Latitude},${companies[i].Longitude}" target="_blank">Get Directions</a>`
      });


      markers[i].addListener('click', function () {

        infoWindows[i].open(map, markers[i]);
      });
    }
  });
}


function getCompany(){
  
  // location.reload();

    let markers = [];
    let infoWindows = [];

    for (let i = 0; i < checkedRows.length; i++) {
      let lat = checkedRows[i].latitude;
      let lng = checkedRows[i].longitude;
      let webpage = checkedRows[i].Website;
      if (webpage.length > 0) {
        if (webpage.substring(0, 4) !== "http") {
          webpage = "https://" + webpage
        }
        webpage = `<a href="${webpage}" target="_blank">Visit Website</a>`
      }
      console.log(lat);
      console.log(lng);
      console.log(checkedRows)
      markers[i] = new google.maps.Marker({
        map: map,
        position: {
          lat: lat,
          lng: lng
        },
        title: checkedRows[i].Facility
      });
console.log(markers)
      
      infoWindows[i] = new google.maps.InfoWindow({
        content: checkedRows[i].Facility + `<div>${checkedRows[i].Contact}</div>` + checkedRows[i].Address + `<br>` + webpage
          + `<br>` + `<a href="https://www.google.com/maps/dir/My+Location/${checkedRows[i].latitude},${checkedRows[i].longitude}" target="_blank">Get Directions</a>`
      });

      // map.setCenter(position);

      markers[i].addListener('click', function () {

        infoWindows[i].open(map, markers[i]);
      });
    }
  };
  
 
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

// $.ajax({
//   method: "GET",
//   url: "api/companies"
// }).done(function (companies) {

// });

$( "#mapButton" ).click(function() {
  getCompanies();
});

$( "#viewAll" ).click(function() {
  getCompanies();
});

$( "#clearMap" ).click(function() {
  location.reload();
});

$( "#vaGreenTable" ).click(function() {
  getCompany();
  console.log(checkedRows);
  $('html, body').animate({
    scrollTop: $("#googleMap").offset().top
}, 1000);
});
  


// $("#button").click(function() {
//   $('html, body').animate({
//       scrollTop: $("#myDiv").offset().top
//   }, 2000);
// });

// $(function(){
//   $('.table tr[data-href]').each(function(){
//       $(this).css('cursor','pointer').hover(
//           function(){ 
//               $(this).addClass('active'); 
//           },  
//           function(){ 
//               $(this).removeClass('active'); 
//           }).click( function(){ 
//               document.location = $(this).attr('data-href'); 
//               console.log("test");  
//           }
//       );
//   });
// });

// var checkedRows = [];

// $('#vaGreenTable').on('check.bs.table', function (e, row) {
//   checkedRows.push({id: row.id, latitude: row.Longitude, longitude: row.Longitude});
//   console.log(checkedRows);
// });

// $('#eventsTable').on('uncheck.bs.table', function (e, row) {
//   $.each(checkedRows, function(index, value) {
//     if (value.id === row.id) {
//       checkedRows.splice(index,1);
//     }
//   });
//   console.log(checkedRows);
// });
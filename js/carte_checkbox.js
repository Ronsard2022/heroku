
// piste texte pour chaque marker à mettre comment dans le html ?? 
//https://developers.google.com/maps/documentation/javascript/reference/info-window?hl=en : infowindow (createInfoWindow mais en oneshot) et la méthode setContent ?!!!!

//https://developers.google.com/maps/documentation/javascript/examples/directions-waypoints?hl=fr#maps_directions_waypoints-html
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 48.852969, lng: 2.349903 },
  });

  directionsRenderer.setMap(map);
  /* ajout personnalisation des markers https://developers.google.com/maps/documentation/javascript/reference/marker?hl=en#MarkerOptions*/
  directionsRenderer.setOptions({
      markerOptions :{
        icon: "assets/img/marker_jaune3.png"  // ajout pour tous les marqueurs Frimousse journey
      },
  });
  /* fin ajout personnalisation des markers et suite doc way_points google*/
  document.getElementById("submit").addEventListener("click", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const waypts = [];
  const checkboxArray = document.getElementById("waypoints");
  // Ajout des points selectionnés dans le tableau des waypts 
  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true,
      });
    }
  }
  //create a DirectionsRequest using WALKING directions
  directionsService
    .route({
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);

      const route = response.routes[0];
      const summaryPanel = document.getElementById("directions-panel");

      summaryPanel.innerHTML = "";

      /* // For each route, display summary information commenté pour retrait des segments en dessous des waypoints à droite //
      for (let i = 0; i < route.legs.length; i++) {
        const routeSegment = i + 1;

        summaryPanel.innerHTML +=
          "<b>Route Segment: " + routeSegment + "</b><br>";
        summaryPanel.innerHTML += route.legs[i].start_address + " to ";
        summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
        summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
      }*/
    })
    
    .catch((e) => window.alert("Directions request failed due to " + status));
};
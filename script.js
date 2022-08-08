window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: '3dscene',
           location: {
               lat: 48.7126388,
               lng: 2.2002996,
           }
       },
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', 'assets/img/belmondo.gltf');
       model.setAttribute('rotation', '0 100 65');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '0.6 1 0.4');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}

//Pour chaque propriété, le triplet de valeurs représente la propriété exprimée en coordonnées X, Y et Z. La rotation est exprimée en degrés, la position en mètres et l'échelle est relative à l'échelle initiale (1 par défaut)
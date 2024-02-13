
mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    zoom: 9, // starting zoom
    center: [-122.3321, 47.6062] // starting center
}
);

map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

    map.addSource('bp-tiles', {
        'type': 'raster',
        'tiles': [
            'assets/bp-tiles/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles designed by Mapbox Gallery</a>'
    });
  
    map.addLayer({
        'id': 'blueprint',
        'type': 'raster',
        'layout': {
            // 'visibility': 'none'
              // Uncomment the line above will hide this map layer at first.
              // This will be useful when you have multiple layers added to your map.
        },
        'source': 'bp-tiles'
    });
  
    map.addSource('picnic-tiles', {
        'type': 'raster',
        'tiles': [
            'assets/picnic-tiles/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles designed by Mapbox Gallery</a>'
    });
  
    map.addLayer({
        'id': 'picnic',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
              // Uncomment the line above will hide this map layer at first.
              // This will be useful when you have multiple layers added to your map.
        },
        'source': 'picnic-tiles'
    });
    map.addSource('picnic-bp-tiles', {
        'type': 'raster',
        'tiles': [
            'assets/picnic-blueprint/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles designed by Mapbox Gallery</a>'
    });
  
    map.addLayer({
        'id': 'picnic blueprint',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
              // Uncomment the line above will hide this map layer at first.
              // This will be useful when you have multiple layers added to your map.
        },
        'source': 'picnic-bp-tiles'
    });
    map.addSource('lunar-tiles', {
        'type': 'raster',
        'tiles': [
            'assets/lunar/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles designed by Mapbox Gallery</a>'
    });
  
    map.addLayer({
        'id': 'lunar',
        'type': 'raster',
        'layout': {
            'visibility': 'none'
              // Uncomment the line above will hide this map layer at first.
              // This will be useful when you have multiple layers added to your map.
        },
        'source': 'lunar-tiles'
    });

    map.on('idle', () => {
        // If these two layers were not added to the map, abort
        if (!map.getLayer('blueprint') || !map.getLayer('picnic') || !map.getLayer('picnic blueprint') || !map.getLayer('lunar')) {
            return;
        }

        // Enumerate ids of the layers.
        const toggleableLayerIds = ['blueprint', 'picnic', 'picnic blueprint','lunar'];

        // Set up the corresponding toggle button for each layer.
        for (const id of toggleableLayerIds) {
            // Skip layers that already have a button set up.
            if (document.getElementById(id)) {
                continue;
            }

            // Create a link.
            const link = document.createElement('a');
            link.id = id;
            link.href = '#';
            link.textContent = id;
            link.className = 'inactive';

            // Show or hide layer when the toggle is clicked.
            link.onclick = function (e) {
                const clickedLayer = this.textContent;
                // preventDefault() tells the user agent that if the event does not get explicitly handled, 
                // its default action should not be taken as it normally would be.
                e.preventDefault();
                // The stopPropagation() method prevents further propagation of the current event in the capturing 
                // and bubbling phases. It does not, however, prevent any default behaviors from occurring; 
                // for instance, clicks on links are still processed. If you want to stop those behaviors, 
                // see the preventDefault() method.
                e.stopPropagation();

                const visibility = map.getLayoutProperty(
                    clickedLayer,
                    'visibility'
                );

                // Toggle layer visibility by changing the layout object's visibility property.
                // if it is currently visible, after the clicking, it will be turned off.
                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    this.className = '';
                } else { //otherise, it will be turned on.
                    this.className = 'active';
                    map.setLayoutProperty(
                        clickedLayer,
                        'visibility',
                        'visible'
                    );
                }
            };

            // in the menu place holder, insert the layer links.
            const layers = document.getElementById('menu');
            layers.appendChild(link);
        }
    });
    
  
  });
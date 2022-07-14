import * as React from 'react';
import Map, { Marker } from 'react-map-gl';

function App() {
  
  return (
    <Map
    mapboxAccessToken={process.env.REACT_APP_MYURL }
        initialViewState={{
          latitude:28.612,
          longitude:77.229,
          zoom:2.5
        }}
style={{width:"100vw",height:"100vh"}}
mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {/* //markerstart */}
      <Marker longitude={77.229} latitude={28.612}
        color={'#FF0000'} offsetLeft={-20} anchor="center">
          <img src=''/><div>YOU are Here</div>
        </Marker>
      {/* //markerend */ }
    

    </Map>
  );
   <div>
  HelloWorld!
  </div> 
}

export default App;

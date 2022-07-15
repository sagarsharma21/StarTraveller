import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
//importing marker icon
// import {LocationOnIcon} from '@mui/icons-material/LocationOn';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
//import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import pngloc from './pngloc.jpg';
import RoomIcon from '@mui/icons-material/Room';
import { lime } from '@mui/material/colors';

function App() {
  
  return (
    <Map
    mapboxAccessToken={process.env.REACT_APP_MYURL }
        initialViewState={{
          latitude:28.612,
          longitude:77.229,
          zoom:8
        }}
style={{width:"100vw",height:"100vh"}}
mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {/* //markerstart */}
      <Marker 
      
       latitude={28.612}
      longitude={77.229}
       color={'#FF0000'} 
        offsetLeft={10} 
        offsetTop={-20}
         offsetBottom={-30}
        pitchAlignment={'map'}
        scale={2}
        draggable={true}
         anchor="left">
         
          {/* <img src="./src/pngloc.jpg" alt='img'/> */}
          <div style={{fontSize:16, color:lime }}>YOU are Here</div>
        <RoomIcon>yyy</RoomIcon>
        </Marker>
      {/* //markerend */ }
    <button variant="contained">Hello</button>

    </Map>
  );
   <div>
  HelloWorld!
  </div> 
}

export default App;

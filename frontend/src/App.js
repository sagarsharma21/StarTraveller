import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import "./App.css";

//importing marker icon
import { Popup } from 'react-map-gl';

import RoomIcon from '@mui/icons-material/Room';
import { lime } from '@mui/material/colors';

import axios from "axios";
//import {format} from "timeago.js";

//importing star icon from material-ui
import StarBorderIcon from '@mui/icons-material/StarBorder';

//import usestate
import { useState } from 'react';
import { useEffect } from 'react';
//import mapboxgl from 'mapbox-gl';
//import { height } from '@mui/system';


//trying viewport
const viewport={width:400,height:600};


function App() {
  //const [viewport, setViewport]= useState({ });
  //start of this code snip
  const [showPopup, setShowPopup] = React.useState(true);

  const setViewport= useState({
    width:"100vw",
    height:"100vh",
    latitude:28,
    longitude:77,
    zoom:4,
  });

  //const [showPopup, setShowPopup]= React.useState(true);

  const [pins,setPins] = useState([]);
  
  useEffect(() => {
      const getPins = async () =>{
        try{
          const res =await axios.get("/pins");
          setPins(res.data);
          
        } catch(err) {
          console.log(err);
        }
      } ;
      getPins()
  },[]);
//end of this code snip

 
  // Create a new marker.
  // const marker = new mapboxgl.Marker()
  //   .setLngLat([77.229, 28.612]);
  //edit 19/7-1
  
  //exit 19/7-1
  


  return (
    <div className='map'>
      <Map
          mapboxAccessToken={process.env.REACT_APP_MYURL }
            {...viewport}
            onViewportChange={(nextViewport)=>setViewport(nextViewport)}
            mapStyle="mapbox://styles/mapbox/streets-v9"

        initialViewState=
          {{
            latitude:28.612,
            longitude:77.229,
            zoom:14
          }}

          
        style=
          {{
            width:"100vw",height:"100vh"
          }}
      >    

      
        {pins.map(p=>(
        <>    
          {/* //markerstart */}
        <Marker 
      
          latitude={28.612} //</Map>{28.612}
          longitude={77.229}//{77.229}
          color={'#FF0000'} 
          //offsetLeft={10} 
          //offsetTop={-20}
          //offsetBottom={-30}
          //pitchAlignment={'map'}
          //scale={2}
          draggable={true}
          anchor="top">
        
          {/* <img src="./src/pngloc.jpg" alt='img'/> */}
          <div
            style={{fontSize:16, color:lime }}>YOU are Here
          </div>
          <RoomIcon 
           style={{fontSize:viewport.zoom*7, color:'lime' }}>Here
          </RoomIcon>
        </Marker>
       
        {/* //adding popup */}
        {showPopup && (
            <Popup className='popup' longitude={77.229} latitude={28.612}
            anchor="left"
            onClose={() => setShowPopup(false)}>
            You are here
            <div className='popupbox'>
              <label>Place</label>
                <h3 className='place'>India Gate</h3>
              <label>Review</label>
                <p className='desc'> <textarea fontSize="x-small" rows={1}></textarea> </p>
              <label>Rating</label>
                <div className='stars'>
                  <StarBorderIcon className='star'></StarBorderIcon>
                  <StarBorderIcon className='star'></StarBorderIcon>
                  <StarBorderIcon className='star'></StarBorderIcon>
                  <StarBorderIcon className='star'></StarBorderIcon>
                  <StarBorderIcon className='star'></StarBorderIcon>
                
                </div>
              <label>Description</label><br></br>
              <span className='username'>Created by  <b>Sagar</b></span><br></br>
              <span className='date'>1 week ago</span>
            </div>
          </Popup>)} 
        
        {/* //end of popup */}


       </>
       
        ))}
      
        <button 
          variant="contained">Hello Traveller
        </button>
       
        
      </Map>
    </div>
  );
  
}

export default App;














/*

//importing popup for Map
// import {LocationOnIcon} from '@mui/icons-material/LocationOn';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
//import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
//import pngloc from './pngloc.jpg';

      //const setViewport={width:window,height:window}


// useEffect(() => {
//       const getPins = async () =>{
//         try{
//           const res =await axios.get("/pins");
//           setPins(res.data);
          
//         } catch(err) {
//           console.log(err);
//         }
//       };
//       getPins()
//   },[]);

//fine till her

//end of this snippet


// {}
const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
.setLngLat(e.lngLat)
.setHTML("<h1>Hello World!</h1>")
.setMaxWidth("300px")
.addTo(map);
// {}

{}
{/* {showPopup &&( 
          <Popup 
           longitude={77.229}
           latitude={28.612}
            anchor="left"
            //onClose={() => setShowPopup(false)}
            >
            <div className='card'>
               You are here/
               <label>Place</label>
                <h4 className='place'>A</h4>
               <label className='desc'>Review</label>
                <p>Lorem ipsum.</p>
               <label>Rating</label>
                <div className='stars'>
                  <StarBorderIcon className='star'/>
                  <StarBorderIcon className='star'/>
                  <StarBorderIcon className='star'/>
                  <StarBorderIcon className='star'/>
                  <StarBorderIcon className='star'/>
                </div>
               
               <label>Description</label>
               <span className='username'>Created by <b>Sagar</b> </span>
               <span className='date'>Created by <b>1 hour ago</b> </span>
               </div>
          </Popup>
        )} }{}
{}
{/*
        <Popup
          latitude={50}
          longitude={50}
          closeButton={true}
          closeOnClick={false}

          anchor="left">     
          <div className='popupbox'>
            <label>Place</label>
            <h3 className='place'>India Gate</h3>
            <label>Review</label>
            
            <label>Rating</label>
            <div className='Rating'>
              <StarBorderIcon></StarBorderIcon>
              <StarBorderIcon></StarBorderIcon>
              <StarBorderIcon></StarBorderIcon>
              <StarBorderIcon></StarBorderIcon>
            
            </div>
              <label>Description</label>
              <span className='username'>Created by<b>Sagar</b></span>
              <span className='date'>1 week ago</span>
            </div>
        </Popup> }
{}
*/ 
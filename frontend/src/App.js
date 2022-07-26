import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import "./App.css";

//importing marker icon
import { Popup } from 'react-map-gl';

import RoomIcon from '@mui/icons-material/Room';
import { lime } from '@mui/material/colors';

import axios from "axios";

//importing star icon from material-ui
import StarBorderIcon from '@mui/icons-material/StarBorder';

//import usestate                     
import { useState } from 'react';
import { useEffect } from 'react';
//import mapboxgl from 'mapbox-gl';
//import { height } from '@mui/system';
import {format} from "timeago.js";
import Register from './components/register';
import Login from "./components/login";

//trying viewport
//const viewport={width:400,height:600};


function App() {
  //const [viewport, setViewport]= useState({ });
  //start of this code snip
  const [showPopup, setShowPopup] = React.useState(true);

  const [currentUser, setCurrentUser] = useState(null);
  const [pins,setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] =useState(false);




  const [viewport, setViewport]= useState({
    width:"100vw",
    height:"100vh",
    latitude:28,
    longitude:77,
    zoom:4,
  });

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

//  const handleMarkerClick = (id,long,lat) => {
//   setCurrentPlaceId(id);
//  };

 const handleAddClick = async (e) =>{
    console.log(e);
    const {lng,lat} =await (e.lngLat);
    const lat1=lat.toFixed(3);
    const lng1=lng.toFixed(3);
    
    setNewPlace ({
       lng:lng1  ,lat:lat1
    });

 };
  // Create a new marker.
  // const marker = new mapboxgl.Marker()
  //   .setLngLat([77.229, 28.612]);
  //edit 25/7-1
  const handleMarkerClick = (id,long,lat) => {
    setCurrentPlaceId(id);
     setViewport({...viewport, longitude:long, latitude:lat
      //zoom:14, height:"100vh", width:"100vw"
    })
   };
  //exit 25/7-1
  
  const handleSubmit= async (e)=> {
    e.preventDefault();
    const newPin = {
      username:currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      lng:newPlace.lng,
    }
   
    try{
      const res = await axios.post("/pins", newPin);
     setPins([...pins, res.data]);
     setNewPlace(null);
    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <div className='map'>
      <Map
          mapboxAccessToken={process.env.REACT_APP_MYURL }
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapStyle="mapbox://styles/mapbox/streets-v9"
              onDblClick={handleAddClick} 

          // initialViewState=
          //   {{
          //     latitude:28.612,
          //     longitude:77.229,
          //     zoom:4
          //   }}

          
          style=
            {{
              width:"100vw",height:"100vh"
            }}
      >    

      
        {pins.map(p=>(
        <>    
          {/* //markerstart */}
        <Marker 
      
          longitude={p.lng}//{77.229}
          latitude={p.lat} //</Map>{28.612}
          
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
           style={{fontSize:viewport.zoom*7, color:p.username===currentUser? "steelblue":"burlywood", cursor:"pointer" }}
           onClick={() => handleMarkerClick(p._id, p.lng, p.lat)}
           onClose={() => setCurrentPlaceId(null)}
           >Here
          </RoomIcon>
        </Marker>
       
        {/* //adding popup */}
         {(p._id === currentPlaceId) && (
          showPopup && (
            <Popup className='popup' longitude={p.lng} latitude={p.lat}
            anchor="left"
             onClose={() => setShowPopup()}>
            You are here
            <div className='popupbox'>
              <label>Place</label>
                <h3 className='place'>{p.title}</h3>
              <label>Review</label>
                <p className='desc'> <textarea fontSize="x-small" rows={1}>{p.desc}</textarea> </p>
              <label>Rating</label>
                <div className='stars'>
                  {/* <StarBorderIcon className='star'></StarBorderIcon>
                      <StarBorderIcon className='star'></StarBorderIcon>
                      <StarBorderIcon className='star'></StarBorderIcon>
                      <StarBorderIcon className='star'></StarBorderIcon>
                      <StarBorderIcon className='star'></StarBorderIcon> */}
                    {Array(p.rating).fill(<StarBorderIcon className='star'/>)}                    
                </div>
              <label>Description</label><br></br>
              <span className='username'>Created by  <b>{p.username}</b></span><br></br>
              {/* <span className='date'>{format(p.createdAt)}</span> */}
            </div>
          </Popup>) 
          )}
        {/* //end of popup */}

  
       </>
       
        ))}  
      
        <button 
          variant="contained">Hello Traveller
        </button>
       
        {newPlace && (showPopup && (
        <Popup 
         
          latitude={newPlace.lat} longitude={newPlace.lng}
          anchor="bottom"
          draggable="true"
          closeOnClick="true"
          onClose={() => setNewPlace(null)}
          // onClose={() => setShowPopup(false)}
          >
          You are here
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                  <input placeholder='Enter title'
                    onChange={(e) => setTitle(e.target.value)}></input>
                <label>Review</label>
                  <textarea placeholder='How was your experiences'
                  onChange={(e)=> setDesc(e.target.value)} rows={1}></textarea>
                <label>Rating</label>
                  <select onChange={(e)=> setRating(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                <label></label>
                <button type='submitButton'>Add Location</button>
              </form>
            </div>
        </Popup>))}

         {currentUser ? (<button className="button logout">Log out</button>) : (       
            <div className='buttons'>
              <button className="button login" onClick={()=>setShowLogin(true)}>Log in</button>
              <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
            </div>
          )}
          
          {showRegister && 
            <Register setShowRegister={setShowRegister} />}
          {showLogin && 
            <Login setShowLogin={setShowLogin} />}  

         <Register/>
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
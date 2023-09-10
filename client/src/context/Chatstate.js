import React, { useState } from "react";
import chatcontext from "./Chatcontext";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const Chatstate = (props) => {
  const [userlist,setuserlist]=useState([{name:"john"},{name:"Dany"},{name:"Shiv"}]);
  const [messages,setmessages]=useState([{username:"john",msg:"hello threre"},{username:"cyan",msg:"hi i am cyan."}]);
  // creating room
  const createRoom = (roomName,username) => {
    socket.emit("createRoom", roomName,username);
  };
  const handleJoinRoom = (roomName,username) => { 
    socket.emit('joinRoom', roomName, username);
  };

  return (
    <div>
      <chatcontext.Provider value={{ createRoom,handleJoinRoom,socket,userlist,messages }}>
        {props.children}
      </chatcontext.Provider>
    </div>
  );
};

export default Chatstate;

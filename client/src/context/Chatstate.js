import React, { useState } from "react";
import chatcontext from "./Chatcontext";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const Chatstate = (props) => {
  const [userlist,setuserlist]=useState([{name:"john"},{name:"Dany"},{name:"Shiv"}]);
  const [messages,setmessages]=useState([]);
  // creating room
  const createRoom = (roomName,username) => {
    const data={roomName,username};
    socket.emit("createRoom", data);
  };
  const handleJoinRoom = (roomName,username) => { 
    socket.emit('joinRoom', roomName, username);
  };
  const sendmessage=(message,roomName,username)=>{
    const maindata={username:username,msg:message};
    setmessages([...messages,maindata]);
    socket.emit('send-message',{message:message,roomName:roomName,username:username});
  }
  const getallmessage=()=>{
    socket.on('show-msg',(data)=>{
      const maindata={username:data.username,msg:data.message};
      console.log(maindata);
      if(data.username!==""){
        setmessages([...messages,maindata]);
      }
      // console.log();
    });
  }
  return (
    <div>
      <chatcontext.Provider value={{ createRoom,handleJoinRoom,socket,userlist,messages,sendmessage,getallmessage }}>
        {props.children}
      </chatcontext.Provider>
    </div>
  );
};

export default Chatstate;

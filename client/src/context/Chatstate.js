import React, { useState } from "react";
import chatcontext from "./Chatcontext";
import io from "socket.io-client";
const socket = io.connect("https://chat-room-backend-4yry.onrender.com");
const Chatstate = (props) => {
  const [visible,setvisible]=useState(false);
  const [userlist,setuserlist]=useState([]);
  const [messages,setmessages]=useState([]);
  const [newRoomName,setnewRoomName]=useState([]);
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
      
      if(data.username!==""){
        setmessages([...messages,maindata]);
      }
    });
  }
  const joineduser=()=>{
    socket.on('userJoined',(data)=>{
      setuserlist(data.user);
      setnewRoomName(data.rName);
    });
  }
  
  const roomCreated=()=>{
    socket.on("roomCreated",(data)=>{
      setnewRoomName(data.rName);
      setuserlist(data.user);
    })
  }
  const handleleaveroom=(username,roomName)=>{
    socket.emit('leaveRoom',roomName,username);
  }
  const leavingresponse=()=>{
    socket.on('leavedRoom',(data)=>{
      setuserlist(data);
    })
  }
  const disconnected=()=>{
    socket.on('userleft',(data)=>{
      setuserlist(data);
    })
  }
  const deleteRoom=(username,roomName)=>{
    const data={roomName,username};
    socket.emit('deleteRoom',data);
  }
  
  return (
    <div>
      <chatcontext.Provider value={{ deleteRoom,visible,setvisible,setnewRoomName,setuserlist,leavingresponse,handleleaveroom,disconnected,newRoomName,roomCreated,joineduser,createRoom,handleJoinRoom,socket,userlist,messages,sendmessage,getallmessage }}>
        {props.children}
      </chatcontext.Provider>
    </div>
  );
};

export default Chatstate;

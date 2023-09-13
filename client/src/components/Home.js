import React, { useContext, useState } from "react";
import "../css/home.css";
import chatcontext from "../context/Chatcontext";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  const [user, setuser] = useState("");
  const [room, setroom] = useState("");
  const contextcontent = useContext(chatcontext);
  const handleroom = (e) => {
    setroom(e.target.value);
  };
  const handleuser = (e) => {
    setuser(e.target.value);
  };
  const handlecreate = (e) => {
    if(localStorage.getItem("username") && localStorage.getItem("room")){
      contextcontent.handleleaveroom(localStorage.getItem("username"),localStorage.getItem("room"));
      localStorage.removeItem("username");
      localStorage.removeItem("room"); 
    }
    e.preventDefault();
    if (user !== "" && room !== "") {
      contextcontent.setvisible(true);
      localStorage.setItem("username", user);
      localStorage.setItem("room", room);
      contextcontent.createRoom(room, user);
      history.push("/chat");
      contextcontent.socket.on('roomAlreadyExist',()=>{
        alert("Room already exists by this room name. so give some unique name.")
        contextcontent.setvisible(false);
        history.push('/');
      })
    }
  };
  const handlejoin = (e) => {
    e.preventDefault();
    if(localStorage.getItem("username") && localStorage.getItem("room")){
      contextcontent.handleleaveroom(localStorage.getItem("username"),localStorage.getItem("room"));
      localStorage.removeItem("username");
      localStorage.removeItem("room");
    }
    if (user !== "" && room !== "") {
      
      localStorage.setItem("username", user);
      localStorage.setItem("room", room);
      contextcontent.handleJoinRoom(room, user);
      history.push("/chat");
      contextcontent.socket.on("roomNotExist", (data) => {
        alert(`${data}`);
        history.push("/");
      });
    }
  };
  return (
    <div>
      <div className="loginsec">
        <div className="logincover">
          <h2 className="heading">Chat-Room</h2>
          <form action="" className="loginform">
            <div className="detail">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={user}
                onChange={handleuser}
                required="true"
              />
            </div>
            <div className="detail">
              <label htmlFor="room">Room Name</label>
              <input type="text" id="room" value={room} onChange={handleroom} />
            </div>
            <div className="btncover">
              <button className="btn" onClick={handlecreate}>
                Create Room
              </button>
              <button className="btn" onClick={handlejoin}>
                Join Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

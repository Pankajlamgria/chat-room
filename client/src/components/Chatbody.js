import React, { useContext, useEffect, useState } from "react";
import chatcontext from "../context/Chatcontext";
import { useHistory } from "react-router-dom";
import 'boxicons'
const Chatbody = () => {
  const history = useHistory();
  const contextcontent = useContext(chatcontext);
  useEffect(() => {
    contextcontent.getallmessage();
  }, [contextcontent.socket, contextcontent.messages])
  const handleleave = () => {
    contextcontent.handleleaveroom(localStorage.getItem("username"), localStorage.getItem("room"));
    history.push("/");
    localStorage.removeItem("username");
    localStorage.removeItem("room");
    window.location.reload(false);
  }
  useEffect(() => {
    contextcontent.socket.on('roomDeleted', async () => {
      history.push('/');
      await alert("Room has been deleted by admin.Join/Create another Room");
      window.location.reload(false);
    })

  }, [contextcontent.socket])
  const handleDeleteRoom = () => {
    contextcontent.deleteRoom(localStorage.getItem("username"), localStorage.getItem('room'));
  }
  const togglemenu=()=>{
    document.getElementById("sidebars").style.display="block";
  }
  return (
    <div className="chatbodycover">
      <div className="headingbar">
        <div id="menuicon" onClick={togglemenu}><box-icon name='menu-alt-left'></box-icon></div>
        <h2 id="chatRoomHeading">Chat-Room</h2>
        <div className="headerbtns">
          <div className="leavebtn"><button onClick={handleleave}>Leave</button></div>
          <div className="dltroom leavebtn" id="dltbtnid" style={{ display: (contextcontent.visible) ? "block" : "none" }}><button onClick={handleDeleteRoom}>Delete</button></div>
        </div>
      </div>
      <div className="chatBodyContent">
        {contextcontent.messages.map((message) =>
          message.username === localStorage.getItem('username') ? (
            <div className="covertosendermsgss">
              <div className="msgcontent you">
                <p className="sendersname senderyou">You</p>
                <p className="msg">
                  {message.msg}
                </p>
              </div>
            </div>
          ) : (
            <div className="covertosendermsgss">
              <div className="msgcontent">
                <p className="sendersname">{message.username}</p>
                <p className="msg">{message.msg}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Chatbody;

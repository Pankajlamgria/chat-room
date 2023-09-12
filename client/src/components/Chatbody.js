import React, { useContext, useEffect } from "react";
import chatcontext from "../context/Chatcontext";
import {useHistory} from "react-router-dom";
const Chatbody = () => {
  const history=useHistory();
  const contextcontent = useContext(chatcontext);
  useEffect(()=>{
    contextcontent.getallmessage();
  },[contextcontent.socket,contextcontent.messages])
  const handleleave=()=>{
    contextcontent.handleleaveroom(localStorage.getItem("username"),localStorage.getItem("room"));
    history.push("/");
    window.location.reload(false);
  }
  return (
    <div className="chatbodycover">
      <div className="headingbar">
        <h2 id="chatRoomHeading">Chat-Room</h2>
        <div className="headerbtns">
        <div className="leavebtn"><button onClick={handleleave}>Leave</button></div>
        <div className="dltroom leavebtn" style={{display:"none"}}><button>Delete</button></div>
        </div>
      </div>
   
      <div className="chatBodyContent">
        {contextcontent.messages.map((message) =>
          message.username === localStorage.getItem('username') ? (
            <div className="msgcontent you">
            <p className="sendersname senderyou">You</p>
            <p className="msg">
              {message.msg}
            </p>
          </div>
          ) : (
            <div className="msgcontent">
          <p className="sendersname">{message.username}</p>
          <p className="msg">{message.msg}</p>
        </div>
          )
        )}
      </div>
    </div>
  );
};

export default Chatbody;

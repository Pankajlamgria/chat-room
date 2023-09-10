import React, { useContext, useEffect } from "react";
import chatcontext from "../context/Chatcontext";

const Chatbody = () => {
  const contextcontent = useContext(chatcontext);
  useEffect(()=>{
    contextcontent.getallmessage();
  },[contextcontent.socket,contextcontent.messages])

  return (
    <div className="chatbodycover">
      <div className="headingbar">
        <h2>Chat-Room</h2>
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

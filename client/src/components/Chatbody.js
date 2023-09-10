import React, { useContext } from "react";
import chatcontext from "../context/Chatcontext";

const Chatbody = () => {
  const contextcontent = useContext(chatcontext);
  return (
    <div className="chatbodycover">
      <div className="headingbar">
        <h2>Chat-Room</h2>
      </div>
      <div className="chatBodyContent">
        <div className="msgcontent">
          <p className="sendersname">John</p>
          <p className="msg">hello i am John</p>
        </div>
        <div className="msgcontent">
          <p className="sendersname">Harry</p>
          <p className="msg">hello i am Harry</p>
        </div>
        <div className="msgcontent">
          <p className="sendersname">Canny</p>
          <p className="msg">hello i am Canny</p>
        </div>
        <div className="msgcontent you">
          <p className="sendersname senderyou">You</p>
          <p className="msg">
            hello i am pankaj singh lamgria Lorem ipsum dolor sit amet
            consectetur adipisicing elit. 
          </p>
        </div>
        {contextcontent.messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
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

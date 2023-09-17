import React from "react";
import Chatbar from "./Chatbar";
import Chatbody from "./Chatbody";
import Chatfooter from "./Chatfooter";
import "../css/chat.css";
const Chat = () => {
 
  return (
    <div>
      <div className="chatCover">
        <Chatbar />
        <div className="chatContent">
          <Chatbody/>
          <Chatfooter/>
        </div>
      </div>
    </div>
  );
};

export default Chat;

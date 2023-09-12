import React, { useContext, useState } from 'react'
import chatcontext from '../context/Chatcontext';

const Chatfooter = () => {
  const contextcontent=useContext(chatcontext);
    const [sendmsg,setsendmsg]=useState("");
    const handlechangeingmsg=(e)=>{
        setsendmsg(e.target.value);
    }
    const handlesendmsg=()=>{
        if(sendmsg!==""){
          contextcontent.sendmessage(sendmsg,localStorage.getItem("room"),localStorage.getItem("username"));
        }
        setsendmsg("");
    }
  return (
    <div>
      <div className="sendingmsgarea">
        
        <input  type="text" id="sendingmsg" value={sendmsg} onChange={handlechangeingmsg} />
        <button onClick={handlesendmsg}>Send</button>
      </div>
    </div>
  )
}

export default Chatfooter

import React, { useState } from 'react'

const Chatfooter = () => {
    const [sendmsg,setsendmsg]=useState("");
    const handlechangeingmsg=(e)=>{
        setsendmsg(e.target.value);
    }
    const handlesendmsg=()=>{
        console.log(sendmsg);
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

import React, { useContext, useEffect } from 'react'
import activeusericon from "../images/activeusericon.png";
import chatcontext from '../context/Chatcontext';
import {useHistory} from "react-router-dom";
const Chatbar = () => {
    const contextcontent=useContext(chatcontext);
    const history=useHistory();
    useEffect(()=>{
      contextcontent.joineduser();
    },[contextcontent.socket,contextcontent.userlist])

    useEffect(()=>{
     
      contextcontent.roomCreated();
      contextcontent.disconnected();
      contextcontent.leavingresponse();
    },[contextcontent.socket,contextcontent.newRoomName,contextcontent.userlist])
    const hidemenu=()=>{
      document.getElementById("sidebars").style.display="none";
    }
  return (  
    <div className='chatBarcls' id="sidebars">
        <div className='roomNamecover'>
          <h3 className='roomName'>{contextcontent.newRoomName}</h3>
          <div id='hidemenu' onClick={hidemenu}><box-icon name='x'></box-icon></div>
        </div>
        <h4 className='atvuser'>Active users</h4>
        <div className="usernamelist">
        {/* <p className='usrname'><img className='atvicon' src={activeusericon} alt="" />john</p>
        <p className='usrname'><img className='atvicon' src={activeusericon} alt="" />Dany</p>
        <p className='usrname'><img className='atvicon' src={activeusericon} alt="" />Shiv</p> */}
        {contextcontent.userlist.map((user) => (
            <p className='usrname'><img className='atvicon' src={activeusericon} alt="" />{user.name}</p>
          ))}
          </div>
    </div>
  )
}

export default Chatbar

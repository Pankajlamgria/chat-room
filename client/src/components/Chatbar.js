import React, { useContext } from 'react'
import activeusericon from "../images/activeusericon.png";
import chatcontext from '../context/Chatcontext';
const Chatbar = () => {
    const contextcontent=useContext(chatcontext);
  return (
    <div className='chatBarcls'>
        <h3 className='roomName'>RoomName</h3>
        <h4 className='atvuser'>Active users</h4>
        <div className="usernamelist">
        <p className='usrname'><img className='atvicon' src={activeusericon} alt="" />john</p>
        <p className='usrname'><img className='atvicon' src={activeusericon} alt="" />Dany</p>
        <p className='usrname'><img className='atvicon' src={activeusericon} alt="" />Shiv</p>
        {contextcontent.userlist.map((user) => (
            <p className='usrname'><img className='atvicon' src={activeusericon} alt="" />{user.name}</p>
          ))}
          </div>
    </div>
  )
}

export default Chatbar

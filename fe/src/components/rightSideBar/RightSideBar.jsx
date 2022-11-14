import './RightSideBar.css'
import {Users} from "../../DummyData"
import Online from "../online/Online"
import { useEffect } from 'react';
import { axios } from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import {Add} from '@mui/icons-material'

export default function RightSideBar({user}) {
 console.log("rsb",user);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [Friends, setFriends] = useState([]);
  const {user:currentUser}=useContext(AuthContext)
  // useEffect(()=>{
  //   const getFriends=async()=>{
  //     try{
  //       const friendList=await axios.get("http://localhost:8080/user/friends/"+user._id)
  //       setFriends(friendList.data)
  //     }catch(err){
        
  //     }
  //   }
  //   getFriends()
  // },[user._id])
  const handleClick=async()=>{
    try{
      
    }catch(err){
      console.log(err);
    }
  }
  let HomeRightBar=()=>{
    return(<>
    <div className="birthdayGiftContainer">
          <div className="birthdayGiftImg">
            <img src="./assets/gift.png" alt="" className="giftImg" />
            <span className="birthdayNotificat"><b>Vijay</b> and <b>other 3 friends </b>have birthday today</span>
          </div>
        </div>
        <img src="./assets/ad.png" alt="" className="rightBaradposter" />
        <h4 className="rigthbarTitle">Online Friend</h4>
        <ul className="rightBarFriendList">
          {Users.map(u=><Online key={u.id} user={u}/>)}
        </ul>
    </>)
  }
  let ProfileRightBar=()=>{
    return(
      <>
      {user.username !== currentUser.data.username && (
        <button className="rightFollowerButton" onClick={handleClick}>
       Follow <Add />
        </button>
      )}
      <h4 className="rightBarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightBarInfoIten">
          <span className="rightBarInfoKey">City:</span>
          <span className="rightBarInfoValue">{user.city}</span>
        </div>
        <div className="rightBarInfoIten">
          <span className="rightBarInfoKey">From:</span>
          <span className="rightBarInfoValue">{user.form}</span>
        </div>
        <div className="rightBarInfoIten">
          <span className="rightBarInfoKey">RelationShip:</span>
          <span className="rightBarInfoValue">{user.relationship ===1 ? "single": user.relationship === 1  ? "Married": '.'}</span>
        </div>
      </div>
      <div className="rightBarFollowings">
        {Friends.map(friend =>(    
        <div className="rightBarfollowing">
          <img src={friend.profilePicture ? PF+friend.profilePicture : PF+'/Avator.png'} alt="" className="rightBarFollowingImg" />
          <span className="rightBarFollowingName">{friend.username}</span>
        </div>
        ))}
      </div>
      </>
    )
  }
  return (
    <div className='rigthSideBar'>
      <div className="rightSideBarWrapper">
       { user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}


import axios from "axios"
import { useEffect, useState } from "react"
import FeedBar from "../../../components/feedBar/FeedBar"
import LeftSideBar from "../../../components/leftSideBar/LeftSideBar"
import RightSideBar from "../../../components/rightSideBar/RightSideBar"
import TopBar from "../../../components/TopBar"
import "./profile.css"
import {useParams} from 'react-router'

export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState([])
  console.log(user);
  const username =useParams().username;
  
  useEffect(()=>{
    let fetchUser=async()=>{
        let res=await axios.get(`http://localhost:8080/user?username=${username}`)
        setUser(res.data)
    }
    fetchUser()
},[username])
  return (
    <div>
         <TopBar />
        <div className="profile">
          <LeftSideBar/>
          <div className="profileRight">
              <div className="profileRightTop">
                  <div className="profileCover">
                  <img src={user.coverPicture ? PF + user.coverPicture : PF+'/cover.png'} alt="" className="profileCoverImg" />
                  <img src={user.profilePicture ? PF +user.profilePicture : PF+'/Avator.png'} alt="" className="profileUserImg" />
                  </div>  
                  <div className="profileInfo">
                  <h4 className="profileInfoName">{username}</h4>
                  <h4 className="profileInfoDesc">{user.desc}</h4>
              </div>
              </div>
              
              <div className="profileRightBottom">
              <FeedBar username= {username}/>
           <RightSideBar user= {user}/>
              </div>
         
          </div>
         
        </div>
    </div>
  )
}

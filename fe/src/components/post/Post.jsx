import { MoreVert } from '@mui/icons-material'
import './post.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {format} from "timeago.js"
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
export default function Post({post}) {
    const [like, setlike] = useState(post.likes.length)
    const [isliked, setisliked] = useState(false)
    const [user, setUser] = useState({})
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    const {user:currentUser} =useContext(AuthContext)

    useEffect(()=>{
        setisliked(post.likes.includes(currentUser.data._id))
    },[currentUser.data._id,post.likes])
    let likeHandle=async()=>{
        try{
          let res= await axios.put(`http://localhost:8080/posts/`+post._id+`/like`,{userID:currentUser.data._id})
           console.log(res);
        }catch(err){

        }
        setlike(isliked ? like-1 : like+1)
        setisliked(!isliked)
    }
    useEffect(()=>{
        let fetchUser=async()=>{
            let res=await axios.get('http://localhost:8080/user?userId='+ post.userId)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img src={user.profilePicture? PF + user.profilePicture : PF +'/Avator.png'} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postProfileName">
                        {user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
    <MoreVert className='postTopRightIcon'/>
                </div>

            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF + post.img } alt="" className="postImg" />
                
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                <img src={`${PF}like.png`} alt="" className="likeButton"  onClick={likeHandle}/>
                <img src={`${PF}heart.png`} alt="" className="likeButton" onClick={likeHandle}/>
                <span className="postLikeContainer">{like} people liked</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post?.comment} Comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

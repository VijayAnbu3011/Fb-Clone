import './FeedBar.css'
import Share from './../share/Share';
import axios from 'axios'


import Post from './../post/Post';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';



export default function FeedBar({username}) {
  const [posts, setPosts] = useState([])
  const {user}=useContext(AuthContext)
  useEffect(()=>{
    let fetchData=async()=>{
      let res=username ?
       await axios.get('http://localhost:8080/posts/profile/'+ username):
       await axios.get('http://localhost:8080/posts/timeline/'+user.data._id);
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      })
      );
    }
  fetchData()
  },[username,user.data._id])
  return (
    <div className='feedBar'>
      <div className="feedWrapper">
      { (! username ||username===user.data.username) && <Share />}
        
        {
          posts.map(p=>(<Post key={p._id} post={p}/>))
        }
        
        
      </div>
    </div>
  )
}

import { PermMedia,Label,Room,EmojiEmotions, Cancel } from '@mui/icons-material'
import React from 'react'
import './share.css'
import { AuthContext } from './../../context/AuthContext';
import { useContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import  axios  from 'axios';

export default function Share() {
    let PF=process.env.REACT_APP_PUBLIC_FOLDER
    const {user} =useContext(AuthContext)
    const desc=useRef();
    const [file, setfile] = useState(null)

    const submitHandler=async (e)=>{
        e.preventDefault()
        const newPost={
            userId: user.data._id,
            desc:desc.current.value
        };
        if(file){
            const data=new FormData();
            const fileName= Date.now() + file.name;
            data.append("file", file);
            data.append('name' , fileName)
            newPost.img=fileName
            try{
                await axios.post('http://localhost:8080/api/upload',data)
            }catch(err){
                console.log(err);
            }
        }
        try{
            await axios.post('http://localhost:8080/posts',newPost);
            window.location.reload()
        }catch(err){

        }
    }
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.data.profilePicture ? PF+user.data.profilePicture: PF+"person/1.jpeg"} alt="" className="shareprofileImg" />
                <input placeholder= {"What's in your mind "+user.data.username+" ?"}
                className="shareInput" 
                 ref={desc} 
                   />
               
            </div>


            <hr className='shareHr' />
            {file && (
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <Cancel className='shareCancelImg' onClick={()=>setfile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className='shareOptionText'>Photo or Video</span>
                        <input style={{display:"none"}} type='file' id="file" accept='.png,.jpeg,.jpg' onChange={(e)=>setfile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className='shareOptionText'>Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className='shareOptionText'>Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="gold" className="shareIcon"/>
                        <span className='shareOptionText'>Mood</span>
                    </div>
                </div>
                <button className="shareBarButton" type='submit'>Share</button>
                </form>           
        </div>
    </div>
  )
}

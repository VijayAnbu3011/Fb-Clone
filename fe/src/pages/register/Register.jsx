import "./register.css";
import { useRef } from 'react';
import axios from "axios";



import {useNavigate} from 'react-router-dom'

export default function Register() {
    const userName=useRef()
    const email=useRef()
    const password=useRef()
    const passwordAgain=useRef()
    const navigate=useNavigate()
    let handleClick=async (e)=>{ 
        e.preventDefault()
        if(password.current.value == passwordAgain.current.value){
            const user={
                username: userName.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try{
               let res= await axios.post("http://localhost:8080/auth/register", user)
               console.log(res.data);
                navigate('/')
            }catch(err){
                console.log(err);
            }
        }else{
            password.current.setCustomValidity("Password does not match")
        }
    }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">VJUniverse</h3>
          <span className="loginDesc">
            Connect With Friend And Other World Around You
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="UserName"  required ref={userName} className="loginInput" />
            <input placeholder="Email" type='email' required ref={email} className="loginInput" />
            <input placeholder="Password " type='password' minLength='6' required ref={password} className="loginInput" />
            <input placeholder="Password Again" type="password" minLength='6' required ref={passwordAgain} className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">Log Into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

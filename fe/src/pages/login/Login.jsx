import { useContext, useRef } from "react"
import "./login.css"
import {loginCall} from "../../apiCalls"
import { AuthContext } from './../../context/AuthContext';
import {CircularProgress} from "@mui/material"

export default function Login() {
    const email=useRef()
    const password=useRef()
    const {user, isFetching , error ,dispatch}=useContext(AuthContext)
    let handleClick=(e)=>{ 
        e.preventDefault()
        loginCall({email: email.current.value, password: password.current.value},dispatch)
    }
    console.log(user);
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
                <input placeholder="Email" type="email" className="loginInput" required  ref={email}/>
                <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref={password}/>
                <button className="loginButton" type="submit" disabled={isFetching}>{isFetching?<CircularProgress color="inherit" size='20px'/>:"LOG IN"}</button>
                <span className="loginForget">Forgot Password</span>
                <button className="loginRegisterButton">Create New Account</button>
            </form>
         </div>
        </div>
    </div>
  )
}

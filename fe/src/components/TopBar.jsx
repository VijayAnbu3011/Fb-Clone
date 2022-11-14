import { Search, Person, Notifications, Chat } from "@mui/icons-material";
import "./topBar.css";
import { Link } from "react-router-dom";
import {useContext}  from "react";
import  {AuthContext}  from "./../context/AuthContext";
export default function TopBar() {
  const { user } = useContext(AuthContext);
  console.log(user.data.username);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <div className="topBarContainer">
        <div className="leftBar">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo">VjUniv</div>
          </Link>
        </div>
        <div className="centerBar">
          <div className="inputBox">
            <Search className="searchIcon" />
            <input placeholder="Searc for friends" className="searchInput" />
          </div>
        </div>
        <div className="rigthBar">
          <div className="timelineLink">
            <div className="homeLink">Home</div>
            <div className="postLink">Post</div>
          </div>
          <div className="rightBarIconsItem">
            <div className="rightBarIcon">
              <div className="personIcon">
                <Person />
                <span className="noteIconBadge">1</span>
              </div>
              <div className="chatIcon">
                <Chat />
                <span className="noteIconBadge">1</span>
              </div>
              <div className="notificationIcon">
                <Notifications />
                <span className="noteIconBadge">1</span>
              </div>
            </div>
            <Link to={`/profile/${user.data.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "Avator.png" 
                }
                alt=""
                className="profileImage"
              />
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

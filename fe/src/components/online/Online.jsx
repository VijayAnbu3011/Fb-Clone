import './online.css'

export default function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="rightBarFriend">
            <div className="rightBarImgContainer">
              <img src={PF+user.profilePicture} alt="" className="rightBarProgileImg" />
              <span className="rightBarOnline"></span>
            </div>
            <span className="rightBarUserName">{user.username}</span>
          </li>
  )
}

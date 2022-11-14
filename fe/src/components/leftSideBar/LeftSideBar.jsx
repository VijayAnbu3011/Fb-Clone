import './LeftSideBar.css'
import {RssFeed,School,Event,Chat,PlayCircle,Group,Bookmark,HelpOutline,WorkOutline} from '@mui/icons-material'
import {Users} from '../../DummyData'
import CloseFriend from '../closeFriends/CloseFriend'
export default function LeftSideBar() {
  return (
    <div className='leftSideBar'>
      <div className="sideBarWrapper">
        <ul className="sideBarlist">
          <li className="sideBarListItem">
            <RssFeed className='sideBarItemIcon'/>
            <span className="sideBarItemText">Feed</span>
          </li>
          <li className="sideBarListItem">
            <Chat className='sideBarItemIcon'/>
            <span className="sideBarItemText">Chats</span>
          </li>
          <li className="sideBarListItem">
            <PlayCircle className='sideBarItemIcon'/>
            <span className="sideBarItemText">Video</span>
          </li>
          <li className="sideBarListItem">
            <Group className='sideBarItemIcon'/>
            <span className="sideBarItemText">Groups</span>
          </li>
          <li className="sideBarListItem">
            <Bookmark className='sideBarItemIcon'/>
            <span className="sideBarItemText">Bookmarks</span>
          </li>
          <li className="sideBarListItem">
            <HelpOutline className='sideBarItemIcon'/>
            <span className="sideBarItemText">Questions</span>
          </li>
          <li className="sideBarListItem">
            <WorkOutline className='sideBarItemIcon'/>
            <span className="sideBarItemText">Jobs</span>
          </li>
          <li className="sideBarListItem">
            <Event className='sideBarItemIcon'/>
            <span className="sideBarItemText">Event</span>
          </li>
          <li className="sideBarListItem">
            <School className='sideBarItemIcon'/>
            <span className="sideBarItemText">Courses</span>
          </li>
        </ul>
        <button className="sideBarButton">Show More</button>
        <hr className='sideBarHr'/>
        <ul className="sideBarFriendList">
          {Users.map(u=><CloseFriend key={u.id} user={u}/>)}
        </ul>
      </div>
    </div>
  )
}









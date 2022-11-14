import TopBar from "../../components/TopBar";
import LeftSideBar from '../../components/leftSideBar/LeftSideBar';
import FeedBar from '../../components/feedBar/FeedBar';
import RightSideBar from '../../components/rightSideBar/RightSideBar';
import "./home.css"


export default function Home() {

 return (
    <div>
        <TopBar />
        <div className="homeContainer">
          <LeftSideBar/>
          <FeedBar />
          <RightSideBar />
        </div>
    </div>
  )
}

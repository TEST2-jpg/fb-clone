import { ReactComponent as Save } from "../assets/save.svg";
import { ReactComponent as HomeSide } from "../assets/homeSide.svg";
import { ReactComponent as UserFriends } from "../assets/userFriends.svg";
import { Link } from "react-router-dom";

const Sidebar = ({ fullName, userAvatar, uId }) => {
  return (
    <div id="sidebar" className="">
      <div className="d-flex column sidebar-font pt-3 gap-2">
        <div className="wid"></div>
        <div className="border-start border-4">
          <div className="d-flex side-content-container align-items-center rounded">
            <div className="svg-container me-3">
              <HomeSide className="blue" />
            </div>
            Home
          </div>
        </div>
        <Link to={`/${uId}`} className="text-decoration-none text-reset">
          <div className="d-flex ms-1 side-content-container align-items-center rounded">
            <div className="svg-container me-3">
              {userAvatar && (
                <img src={userAvatar} className="avatar side-avatar" alt="profile pic"/>
              )}
            </div>
            {fullName}
          </div>
        </Link>
        <Link to="/friends" className="text-decoration-none text-reset">
          <div className="d-flex ms-1 side-content-container align-items-center rounded">
            <div className="svg-container me-3">
              <UserFriends />
            </div>
            Friends
          </div>
        </Link>
        <div className="d-flex ms-1 side-content-container align-items-center rounded">
          <div className="svg-container me-3">
            <Save />
          </div>
          Saved
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

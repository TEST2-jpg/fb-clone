import { ReactComponent as FriendReq } from "../assets/friendReq.svg";
import { ReactComponent as Suggestions } from "../assets/userFriends.svg";
import { ReactComponent as AllFriend } from "../assets/allFriend.svg";
import { ReactComponent as Pending } from "../assets/pending.svg";



const FriendSide = ({navigateFriendSec}) => {
  return (
    <div
      style={{ position: "fixed", height: "100%", width: "360px" }}
      className="bg-white px-3 py-2 shadow"
    >
      <div className="d-flex column gap-2">
        <h3 className="fw-bold text-dark">Friends</h3>
        <div className="d-flex si3i0f9 align-items-center rounded" onClick={() => navigateFriendSec('friendReqRef')}>
          <div className="d-flex justify-content-center px-2">
            <FriendReq style={{ width: "26px", height: "26px" }} />
          </div>
          <div className="prj">Friend Requests</div>
        </div>
        <div className="d-flex si3i0f9 align-items-center rounded" onClick={() => navigateFriendSec('friendPendRef')}>
          <div className="d-flex justify-content-center px-2">
            <Pending style={{ width: "26px", height: "26px" }} />
          </div>
          <div className="prj">Pending Requests</div>
        </div>
        <div className="d-flex si3i0f9 align-items-center rounded" onClick={() => navigateFriendSec('friendAllRef')}>
          <div className="d-flex justify-content-center px-2">
            <AllFriend style={{ width: "26px", height: "26px" }} />
          </div>
          <div className="prj">All Friends</div>
        </div>
        <div className="d-flex si3i0f9 align-items-center rounded" onClick={() => navigateFriendSec('friendSuggestionRef')}>
          <div className="d-flex justify-content-center px-2">
            <Suggestions style={{ width: "26px", height: "26px" }} />
          </div>
          <div className="prj">Suggestions</div>
        </div>
      </div>
    </div>
  );
};

export default FriendSide;

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import FriendSide from "./FriendSide";
import Nav from "./Nav";
import UserCards from "./UserCards";

const Friends = ({ token, userId }) => {
  const [userIds, setUserIds] = useState(null);
  const [uIdReqs, setUIdReqs] = useState();
  const [uIdPendings, setUIdPendings] = useState();
  const [uidFriends, setUIdFriends] = useState();
  const friendReqRef = useRef(null);
  const friendSuggestionRef = useRef(null);
  const friendPendRef = useRef(null);
  const friendAllRef = useRef(null);
  const getFriendFeed = async (requestJson, pendingJson, friendsJson) => {
    const response = await fetch(`http://localhost:8080/friend`, {
      headers: { Authorization: "Bearer " + token },
    });
    const ids = await response.json();
    let filteredUIds = ids.users.filter((id) => id._id !== userId);
    const filteredReqs = filteredUIds.filter(
      (x) => !requestJson.friendReq.map((x) => x.requester).includes(x._id)
    );
    const filteredPends = filteredReqs.filter(
      (x) => !pendingJson.friendPendings.map((x) => x.requester).includes(x._id)
    );
    const filteredFriends = filteredPends.filter(
      (x) => !friendsJson.friends.map((x) => x.requester).includes(x._id)
    );
    setUserIds(filteredFriends);
  };
  const getReqs = async (cb) => {
    const reqsResponse = await fetch(
      `http://localhost:8080/friend/requests?uId=${userId}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const reqJson = await reqsResponse.json();
    const pendingResponse = await fetch(
      `http://localhost:8080/friend/pendings?uId=${userId}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const pendingJson = await pendingResponse.json();
    const friendsResponse = await fetch(
      `http://localhost:8080/friend/userFriend?uId=${userId}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const friendsJson = await friendsResponse.json();
    setUIdFriends(friendsJson);
    setUIdPendings(pendingJson);
    setUIdReqs(reqJson);
    cb(reqJson, pendingJson, friendsJson);
  };
  useEffect(() => {
    getReqs(getFriendFeed);
  }, [token, userId]);

  const removeId = (idToDel) => {
    setUserIds(userIds.filter((x) => x._id !== idToDel));
  };
  const navigateFriendSec = (friendSec) => {
    let target = "";
    if (friendSec === "friendReqRef") target = friendReqRef;
    if (friendSec === "friendSuggestionRef") target = friendSuggestionRef;
    if (friendSec === "friendPendRef") target = friendPendRef;
    if (friendSec === "friendAllRef") target = friendAllRef;
    target.current.scrollIntoView();
  };
  return (
    <div>
      <Nav />
      <div className="d-flex">
        <div className="flexbasis" style={{ minWidth: "360px" }}>
          <FriendSide navigateFriendSec={navigateFriendSec} />
        </div>
        <div className="p-4">
          <h5 className="fw-bold py-3" ref={friendReqRef}>
            Friend Requests
          </h5>
          <div className="d-flex flex-wrap gap-2">
            {uIdReqs &&
              uIdReqs.friendReq.map((cardInfo) => (
                <UserCards
                  key={cardInfo._id}
                  token={token}
                  cardInfo={cardInfo.requester}
                  userId={userId}
                  removeId={removeId}
                  load={() => getReqs(getFriendFeed)}
                />
              ))}
          </div>
          <hr></hr>
          <h5 className="fw-bold py-3" ref={friendPendRef}>
            Pending Requests
          </h5>
          <div className="d-flex flex-wrap gap-2">
            {uIdPendings &&
              uIdPendings.friendPendings.map((cardInfo) => (
                  <UserCards
                    key={cardInfo._id}
                    token={token}
                    cardInfo={cardInfo.requester}
                    userId={userId}
                    removeId={removeId}
                    load={() => getReqs(getFriendFeed)}
                  />
              ))}
          </div>
          <hr></hr>
          <h5 className="fw-bold py-3">All friends</h5>
          <div className="d-flex flex-wrap gap-2" ref={friendAllRef}>
            {uidFriends &&
              uidFriends.friends.map((cardInfo) => (
                <UserCards
                  key={cardInfo._id}
                  token={token}
                  cardInfo={cardInfo.requester}
                  userId={userId}
                  removeId={removeId}
                  load={() => getReqs(getFriendFeed)}
                />
              ))}
          </div>
          <h5 className="fw-bold py-3" ref={friendSuggestionRef}>
            People You May Know
          </h5>
          <div className="d-flex flex-wrap gap-2">
            {userIds &&
              userIds.map((cardInfo) => (
                <UserCards
                  key={cardInfo._id}
                  token={token}
                  cardInfo={cardInfo._id}
                  userId={userId}
                  removeId={removeId}
                  load={() => getReqs(getFriendFeed)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Friends;

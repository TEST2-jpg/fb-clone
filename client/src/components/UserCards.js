import { useEffect, useState } from "react";
import FriendAdd from "./FriendAdd";
import { Link } from "react-router-dom";

const UserCards = ({ cardInfo, token, userId, removeId, load }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(`http://localhost:8080/users/${cardInfo}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setUserInfo(await response.json());
    };
    getUserInfo();
  }, [token, cardInfo]);
  return (
    <div>
      <div class="card" style={{ width: "200px" }}>
        <Link to={`/${cardInfo}`} className="text-reset text-decoration-none">
          <img
            src={userInfo.avatar}
            class="card-img-top"
            alt="profile pic"
            style={{ height: "180px", width: "200px", objectFit: "cover" }}
          />
        </Link>
        <div class="card-body">
          <h5 class="card-title text-truncate">
            {userInfo.first_name} {userInfo.last_name}
          </h5>
          <div className="d-flex column gap-2">
            {userInfo._id && (
              <FriendAdd
                id={userInfo._id}
                token={token}
                userId={userId}
                load={load}
              />
            )}
            <button
              onClick={() => removeId(cardInfo)}
              className="btn rm-bg-color fw-semibold shadow-none"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCards;

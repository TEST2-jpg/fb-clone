import { useEffect, useState } from "react";

const ContactNames = ({ id, token }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setUserInfo(await response.json());
    };
    getUserInfo();
  }, [id, token]);
  return (
    <div>
      <div
        className="d-flex side-content-container align-items-center rounded"
        style={{ padding: "8px 8px" }}
      >
        <div className="svg-container me-3">
          {userInfo && (
            <img
              src={userInfo.avatar}
              className="avatar side-avatar"
              alt="profile pic"
            />
          )}
        </div>
        {userInfo.first_name} {userInfo.last_name}
      </div>
      
    </div>
  );
};
export default ContactNames;

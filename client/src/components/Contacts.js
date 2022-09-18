import { useEffect, useState } from "react";
import ContactNames from "./ContactNames";

const Contacts = ({ userId, token }) => {
  const [friendIds, setFriendIds] = useState();
  useEffect(() => {
    const getFriendIds = async () => {
      const friendsResponse = await fetch(
        `http://localhost:8080/friend/userFriend?uId=${userId}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setFriendIds(await friendsResponse.json());
    };
    getFriendIds();
  }, [userId, token]);
  return (
    <div className="contacts">
      <div className="d-flex column sidebar-font pt-3 gap-2">
        <div style={{ fontSize: "17px", color: "#050505", fontWeight: "600" }}>
          Contacts
        </div>
        {friendIds &&
          friendIds.friends?.map((ids) => (
            <ContactNames id={ids.requester} token={token} />
          ))}
      </div>
    </div>
  );
};

export default Contacts;

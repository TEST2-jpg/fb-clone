import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FriendAdd from "./FriendAdd";
import Nav from "./Nav";
import Post from "./Post";
import UpdateAvatar from "./UpdateAvatar";
import { ReactComponent as Image } from "../assets/image.svg";

const VisitUser = ({ token, userId, userData, setUserData }) => {
  const params = useParams();
  const id = params.userId;
  const [feed, setFeed] = useState(null);
  const [avatarModal, setAvatarModal] = useState(false);
  const [hover, setHover] = useState(false);
  const [userInfo, setUserInfo] = useState()

  const getUserPage = async () => {
    const response = await fetch(`http://localhost:8080/userVisit/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    setFeed(data.postList);
  };

  const getUserInfo = async () => {
    const response = await fetch(`http://localhost:8080/users/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    setUserInfo(data)
  };

  useEffect(() => {
    getUserPage();
    getUserInfo();
  }, []);

  const showComment = (postId) => {
    const replace = (commentArray) => {
      console.log(feed, "feed");
      let updatedPost = feed.map((x) => {
        if (x._id === postId) {
          return { ...x, comment: commentArray.comment };
        }
        return x;
      });
      setFeed(updatedPost);
    };
    const fetchThisComment = async () => {
      const response = await fetch(
        `http://localhost:8080/users/${userData._id}/posts/${postId}/comments`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      const postData = await response.json();
      console.log(postData, "POSTDAATA");
      replace(postData);
    };
    fetchThisComment().catch(console.error);
  };

  return (
    <div>
      <Nav />
      <div className="bg-white border-bottom">
        <div className="asd">asd</div>
        <button onClick={() => console.log(userInfo)}>ISUDDHFH</button>
        <div className="text-center home-user-info d-flex justify-content-center container">
          <div className="d-flex">
            <div
              className="d-flex"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {userInfo && <img
                src={userInfo.avatar}
                alt="profile"
                className="home-avatar border border-2 align-self-end"
                onClick={() => setAvatarModal(true)}
              />}
              {avatarModal && id===userData._id && (
                <UpdateAvatar
                  setAvatarModal={setAvatarModal}
                  token={token}
                  userId={id}
                  setUserInfo={setUserInfo}
                  setHover={setHover}
                  setUserData={setUserData}
                  avatarId={userInfo.avatarId}
                />
              )}
              {hover && id===userData._id && (
                <div className="position-relative">
                  <Image
                    className="avatar-update"
                    onClick={() => setAvatarModal(true)}
                  />
                </div>
              )}
            </div>
            <div className="d-flex column wpoec">
              {userInfo && (
                <h1 className="text-start">
                  {userInfo.first_name} {userInfo.last_name}
                </h1>
              )}
            </div>
            <div className="d-flex pb-4">
              {id !== userData._id ? (
                <FriendAdd token={token} userId={userId} id={id} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        {feed ? (
          feed.map((postInfo) => {
            return (
              <Post
                setFeed={setFeed}
                loadFeed={getUserPage}
                token={token}
                userId={userId}
                postInfo={postInfo}
                key={postInfo._id}
                showComment={showComment}
              />
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      <h1>In visit </h1>
    </div>
  );
};

export default VisitUser;

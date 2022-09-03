import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import CreatePost from "./CreatePost";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Contacts from "./Contacts";
import Nav from "./Nav";
import { ReactComponent as Profile } from "../assets/profile.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = ({ token, ps, userData, userId }) => {
  const [feed, setFeed] = useState([]);
  const [postModal, setPostModal] = useState(false);
  const navigate = useNavigate();
  const loadFeed = () => {
    const fetchPost = async () => {
      const response = await fetch(
        `http://localhost:8080?skip=${feed.length}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      const postData = await response.json();
      setFeed(postData.postList);
      console.log(postData);
    };
    fetchPost().catch(console.error);
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    loadFeed();
  }, []);

  const showComment = (postId, skip) => {
    const replace = (commentArray) => {
      let updatedPost = feed.map((x) => {
        if (x._id === postId) {
          return { ...x, comment: [...x.comment, ...commentArray.comment] };
        }
        return x;
      });
      setFeed(updatedPost);
    };
    const fetchThisComment = async () => {
      const response = await fetch(
        `http://localhost:8080/users/${userData._id}/posts/${postId}/comments?skip=${skip}`,
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
  const fetchMore = async () => {
    const response = await fetch(`http://localhost:8080?skip=${feed.length}`, {
      headers: { Authorization: "Bearer " + token },
    });
    const postData = await response.json();
    setFeed([...feed, ...postData.postList]);
    console.log("runfetchmore");
  };

  return (
    <>
      {token ? (
        <div>
          <Nav />
          <button
            onClick={() => {
              console.log(feed);
              console.log(userId);
              console.log(token);
              console.log(userData);
            }}
          >
            CONSOLE LOGS
          </button>
          <div className="flex-container">
            <Sidebar
              fullName={userData.first_name + " " + userData.last_name}
            />
            <div className="d-flex px-4">
              <div className="d-flex flex-column">
                {/* <CreatePost loadFeed={loadFeed} token={token} userId={userId} /> */}
                <div className="container border bg-white rounded-4 create-post-width p-0 mb-3">
                  <div className="d-flex post-head">
                    <div className="pe-1">
                      <Profile className="profile" />
                    </div>
                    <div
                      className="rounded-5 create-post-font cpcol"
                      onClick={() => setPostModal(true)}
                    >
                      What's on your mind?
                    </div>
                  </div>
                </div>
                {postModal && (
                  <CreatePost
                    fullName={userData.first_name + " " + userData.last_name}
                    loadFeed={loadFeed}
                    token={token}
                    userId={userId}
                    setPostModal={setPostModal}
                    setFeed={setFeed}
                  />
                )}
                <button onClick={fetchMore}>WAZZUP</button>
                <div id="scroll">
                  <InfiniteScroll dataLength={feed.length} next={fetchMore} hasMore={true}>
                    {feed ? (
                      feed.map((postInfo) => {
                        return (
                          <Post
                            setFeed={setFeed}
                            loadFeed={loadFeed}
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
                  </InfiniteScroll>
                </div>
              </div>
            </div>
            <Contacts />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;

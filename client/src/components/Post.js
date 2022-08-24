import { useState, useEffect } from "react";
import { ReactComponent as OptionIcon } from "../assets/options.svg";
import { ReactComponent as Profile } from "../assets/profile.svg";
import WriteComment from "./WriteComment";
import { Link } from "react-router-dom";
import EditPost from "./EditPost";
import moment from "moment";
import Option from "./Option";

const Post = ({ postInfo, showComment, userId, token, loadFeed }) => {
  const [btnState, setBtn] = useState(true);
  const [postStat, setpostStat] = useState([]);
  const [option, setOption] = useState(false);
  const preventFetch = () => {
    setBtn(false);
  };
  const deletePost = async (postId) => {
    await fetch(`http://localhost:8080/users/${userId}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });
  };
  const getPostStat = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/posts/${postId}/postStat`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setpostStat(data.comments.length);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (postId) => {
    await fetch(`http://localhost:8080/users/${userId}/posts/${postId}/like`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });
    loadFeed();
  };

  const unlikePost = async (postId) => {
    await fetch(
      `http://localhost:8080/users/${userId}/posts/${postId}/unlike`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      }
    );
    loadFeed();
  };

  useEffect(() => {
    getPostStat(postInfo._id);
  }, []);

  return (
    <div className="container border bg-white rounded-4 post-width mb-3 shadow-sm px-0">
      <div className="d-flex post-head">
        <div className="d-flex w-100 align-items-center">
          <span>
            <Profile className="profile" />
          </span>
          <div className="flex-container-column flex-grow-1">
            <Link
              className="link-name"
              to={`/${postInfo.author.first_name}.${postInfo.author.last_name}`}
              state={{ id: postInfo.author._id }}
            >
              <h2 className="author-name">{`${postInfo.author.first_name} ${postInfo.author.last_name}`}</h2>
            </Link>
            <div className="created-at">
              {moment(postInfo.createdAt).fromNow()}
            </div>
          </div>
          {/* {postInfo.author._id === userId ? (
            <EditPost
              token={token}
              userId={userId}
              postInfo={postInfo}
              loadFeed={loadFeed}
            />
          ) : null} */}
          <div className="option rounded-circle d-flex justify-content-center align-items-center">
            <div
              className="option rounded-circle d-flex justify-content-center align-items-center"
              onClick={() => setOption((prev) => !prev)}
            >
              <OptionIcon className="svg16px" />
            </div>
            {option && (
              <Option
                token={token}
                userId={userId}
                postInfo={postInfo}
                loadFeed={loadFeed}
                setOption={setOption}
              />
            )}
          </div>
        </div>
      </div>
      <div className="px-3 fs-6 font-color">{postInfo.post}</div>
      <div className="d-flex like-comment-container">
        {postInfo.likes ? <div>Likes: {postInfo.likes}</div> : null}
        {postStat !== 0 ? (
          <div className="px-3">
            {" "}
            {postStat > 1 ? (
              <div>{postStat} comments</div>
            ) : (
              <div>{postStat} comment</div>
            )}
          </div>
        ) : null}
      </div>

      <div className="border-top border-bottom d-flex justify-content-around p-2">
        {/* <button className="rounded flex-fill" onClick={() => {
                    if (btnState) showComment(postInfo._id)
                    preventFetch()
                }
                }>Comment</button> */}
        {!postInfo.likers.includes(userId) ? (
          <button
            className="rounded flex-fill"
            onClick={() => likePost(postInfo._id)}
          >
            Like
          </button>
        ) : (
          <button onClick={() => unlikePost(postInfo._id)}>Unlike</button>
        )}
        {postInfo.author._id === userId ? (
          <button
            className="flex-fill rounded"
            onClick={async () => {
              await deletePost(postInfo._id);
              loadFeed();
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
      <WriteComment
        showComment={showComment}
        userId={userId}
        authorId={postInfo.author._id}
        token={token}
        postInfoId={postInfo._id}
      />
      {postInfo.comment.map((x, i) => (
        <div key={i}>
          {x.author.first_name} {x.author.last_name} ---- {x.comment}
        </div>
      ))}
      {postStat <= postInfo.comment.length ? null : (
        <div
          onClick={() => {
            if (btnState) showComment(postInfo._id);
            preventFetch();
          }}
        >
          View more comments
        </div>
      )}
    </div>
  );
};

export default Post;

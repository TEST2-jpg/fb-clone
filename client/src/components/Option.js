import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as SaveIcon } from "../assets/save.svg";
import EditPost from "./EditPost";
import { useState } from "react";

const Option = ({ token, userId, postInfo, loadFeed, setOption, setFeed }) => {
  const [delState, setDelState] = useState(true);
  const deletePost = async (postId) => {
    preventFetch()
    await fetch(`http://localhost:8080/users/${userId}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });
    setFeed((prev) => {
      return prev.filter(post => post._id !== postId)
    });
  };
  const preventFetch = () => {
    setDelState(false);
  };
  return (
    <div
      id="option"
      className="border shadow-lg rounded d-flex flex-column justify-content-center"
    >
      <div className="option-content-container p-0">
        <SaveIcon className="option-content-icon" />
        <div className="option-content-text px-2 ">
          <div>Save post</div>
          <span className="option-content-disc">
            Add this to your saved items.
          </span>
        </div>
      </div>
      <hr></hr>
      {postInfo.author._id === userId ? (
        <EditPost
          token={token}
          userId={userId}
          postInfo={postInfo}
          loadFeed={loadFeed}
          setOption={setOption}
          setFeed={setFeed}
        />
      ) : null}
      {postInfo.author._id === userId ? (
        <div
          className="option-content-container"
          onClick={async (e) => {
            if (delState) await deletePost(postInfo._id);
          }}
        >
          <DeleteIcon className="option-content-icon" />
          <div className="option-content-text px-2">Delete post</div>
        </div>
      ) : null}
    </div>
  );
};

export default Option;

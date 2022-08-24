import { useState } from "react";
import { ReactComponent as Profile } from "../assets/profile.svg";

const WriteComment = ({ token, userId, authorId, postInfoId, showComment }) => {
  const [comment, setComment] = useState("");
  const addComment = async () => {
    const jsonData = await fetch(
      `http://localhost:8080/users/${userId}/posts/${postInfoId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          commentBody: comment,
          userId,
        }),
      }
    );
    await jsonData.json();
    setComment("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment();
    showComment(postInfoId);
  };
  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="d-flex align-items-center">
          <span>
            <Profile className="profileside" />
          </span>
          <input
            className="form-control px-2 shadow-none rounded-5"
            name="comment"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default WriteComment;

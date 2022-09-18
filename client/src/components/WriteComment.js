import { useState } from "react";

const WriteComment = ({
  token,
  userId,
  postInfoId,
  commentRef,
  setFeed,
  getPostStat,
  avatar,
}) => {
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
    const response = await jsonData.json();
    console.log(response);
    setFeed((prev) => {
      let updated = prev.map((post) => {
        if (post._id === postInfoId)
          return { ...post, comment: [response.comment, ...post.comment] };
        return post;
      });
      console.log(updated);
      return updated;
    });
    setComment("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment();
    await getPostStat(postInfoId);
    // showComment(postInfoId);
  };
  return (
    <div className="mt-3 px-3">
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="d-flex align-items-center">
          <span className="avatar-container">
            <img src={avatar} alt="avatar" className="avatar" style={{width: '32px', height: '32px'}} />
          </span>
          <input
            ref={commentRef}
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

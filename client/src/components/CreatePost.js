import { useState } from "react";
import { ReactComponent as Profile } from "../assets/profile.svg";

const CreatePost = ({ token, userId, loadFeed }) => {
  const [post, setPost] = useState("");
  const addPost = async () => {
    const jsonData = await fetch(
      `http://localhost:8080/users/${userId}/posts/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          postBody: post,
          userId,
        }),
      }
    );
    await jsonData.json();
    setPost("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost();
    loadFeed();
  };
  return (
    <div className="container border bg-white rounded-4 create-post-width p-0 mb-3">
      <div className="d-flex post-head">
        <div className="pe-1">
          <Profile className="profile" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control rounded-5 create-post-font"
            name="post"
            placeholder="What's on your mind?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

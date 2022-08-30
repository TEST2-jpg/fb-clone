import { useState } from "react";
import { ReactComponent as Profile } from "../assets/profile.svg";
import { ReactComponent as Close } from "../assets/close.svg";

const CreatePost = ({ token, userId, loadFeed, setPostModal, fullName }) => {
  const [post, setPost] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };
  const addPost = async () => {
    const form = new FormData();
    form.append("image", selectedFile);
    form.append("postBody", post);
    form.append("userId", userId);
    const jsonData = await fetch(
      `http://localhost:8080/users/${userId}/posts/`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: form,
      }
    );
    await jsonData.json();
    setPost("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost();
    loadFeed();
    setPostModal(false);
  };
  return (
    <div className="create-post-bg">
      <div>
        <div className="container-cp border bg-white create-post-width p-0 mb-3 shadow-lg mx-auto">
          <div className="d-flex justify-content-center align-items-center oa129ix">
            <div className="cr-post-txt">Create post</div>
            <div
              onClick={() => setPostModal(false)}
              className="closebtn rounded-circle d-flex justify-content-center align-items-center"
            >
              <Close className="closebtnsvg" />
            </div>
          </div>
          <hr className="m-0 pb-2" />
          <div className="d-flex mx-3 py-3">
            <div className="pe-1">
              <Profile className="profile" />
            </div>
            <div className="d-flex flex-column">{fullName}</div>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <textarea
              className="form-control create-post-font textarea-create shadow-none"
              name="post"
              placeholder="What's on your mind?"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
            <input
              className="form-control"
              type="file"
              name="image"
              onChange={fileHandler}
            ></input>
            <div className="d-flex justify-content-center px-3 pb-3">
              <button
                className="btn btn-primary w-100"
                disabled={!(post.length !== 0 || !!selectedFile )}
              >
                Post
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                const f = new FormData();
                f.append("image", selectedFile);
                console.log(f, "eeee", selectedFile);
              }}
            >
              AISUD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

import { useState } from "react";
import { ReactComponent as EditIcon } from "../assets/edit.svg";

const EditPost = ({ token, userId, loadFeed, postInfo, setOption }) => {
  const [post, setPost] = useState("");
  const fetchOldPost = async () => {
    const response = await fetch(
      `http://localhost:8080/users/${userId}/posts/${postInfo._id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const result = await response.json();
    setPost(result);
  };

  const editPost = async () => {
    const jsonData = await fetch(
      `http://localhost:8080/users/${userId}/posts/${postInfo._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          postBody: post.postMessage,
        }),
      }
    );
    await jsonData.json();
    loadFeed();
  };

  const loadingModal = () => {
    return (
      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id={"post" + postInfo._id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Loading</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        className="option-content-container"
        onClick={fetchOldPost}
        data-bs-toggle="modal"
        data-bs-target={"#post" + postInfo._id}
      >
        <EditIcon className="option-content-icon" />
        <div className="option-content-text px-2">Edit</div>
      </div>
      {post ? (
        <div
          className="modal fade"
          id={"post" + postInfo._id}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit post
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control shadow-none"
                  placeholder="What's on your mind?"
                  value={post.postMessage}
                  onChange={(e) =>
                    setPost((prev) => ({
                      ...prev,
                      postMessage: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setOption(false);
                    await editPost();
                  }}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        loadingModal()
      )}
    </>
  );
};

export default EditPost;

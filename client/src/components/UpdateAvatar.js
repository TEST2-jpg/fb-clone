import { ReactComponent as Close } from "../assets/close.svg";
import { useState, useEffect } from "react";

const UpdateAvatar = ({
  setAvatarModal,
  token,
  userId,
  setUserData,
  setHover,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };
  useEffect(() => {
    setHover(false);
  }, []);
  const avatarUpdate = async () => {
    const form = new FormData();
    form.append("image", selectedFile);
    const jsonData = await fetch(
      `http://localhost:8080/userVisit/${userId}/avatar`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: form,
      }
    );
    const response = await jsonData.json();
    setUserData((prev) => ({ ...prev, avatar: response.avatar }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await avatarUpdate();
    setAvatarModal(false);
  };
  return (
    <div className="create-post-bg">
      <div className="container-cp border bg-white create-post-width p-0 mb-3 shadow-lg mx-auto">
        <div className="d-flex justify-content-center align-items-center oa129ix">
          <div className="cr-post-txt">Update Profile</div>
          <div
            onClick={() => setAvatarModal(false)}
            className="closebtn rounded-circle d-flex justify-content-center align-items-center"
          >
            <Close className="closebtnsvg" />
          </div>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            className="form-control"
            type="file"
            name="image"
            onChange={fileHandler}
          ></input>
          <div className="d-flex justify-content-center px-3 pb-3">
            <button
              className="btn btn-primary w-100"
              disabled={!!!selectedFile}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAvatar;

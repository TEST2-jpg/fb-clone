import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const registerUser = async () => {
    const jsonData = await fetch("http://localhost:8080/reg", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        formData,
      }),
    });
    await jsonData.json();
    setFormData({ first_name: "", last_name: "", email: "", password: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
    
  };
  return (
    <>
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
        alt="fb-logo"
        className="d-block"
        style={{ height: "100px", margin: "auto" }}
      />
      <div className="form-container">
        <div class="sign-head">
          <div class="sign-title text-center">Create a new account</div>
          <div class="sign-desc text-center">It's quick and easy.</div>
        </div>
        <form onSubmit={handleSubmit} className="form-reg">
          <div className="row flreg">
            <div className="mb-2 col-6 fname singup-input">
              <input
                type="text"
                placeholder="First Name"
                className="form-control fname"
                onChange={handleChange}
                name="first_name"
                value={formData.first_name}
              />
            </div>
            <div className="mb-2 col-6 fname singup-input">
              <input
                className="form-control lname"
                type="text"
                placeholder="Last name"
                onChange={handleChange}
                name="last_name"
                value={formData.last_name}
                id="Lname"
              />
            </div>
          </div>
          <div className="mb-2">
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className="form-control signup-input"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="New Password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              className="form-control signup-input"
            />
          </div>
          <div className="container d-flex align-items-center justify-content-center">
            <button className="btn btn-success mt-2 w25 px-5 btnstyle">
              Sign Up
            </button>
          </div>
          <div>
            <Link to="/login" className="text-decoration-none text-center create-post-font"><p>Already have an account?</p></Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

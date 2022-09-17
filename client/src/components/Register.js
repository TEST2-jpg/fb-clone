import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setToken, setuserId }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const logUser = async () => {
    const { email, password } = formData;
    try {
      const jsonData = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const response = await jsonData.json();
      await setToken(response.token);
      await setuserId(response._id);
      if (response.token) navigate("/");
    } catch (error) {
      console.log(error);
    }
    setFormData({ email: "", password: "" });
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
    if (jsonData.status === 422) return setErrors(await jsonData.json());
    const response = await jsonData.json();
    if (jsonData.status === 201) logUser();
    setFormData({ first_name: "", last_name: "", email: "", password: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();
  };
  const setInvalidClass = (formField) => {
    return errors?.errors.find((x) => x.param === formField)
      ? "is-invalid"
      : null;
  };
  const filterErrMsg = (formField) => {
    return errors.errors
      .filter((x) => x.param === formField)
      .map((x) => <div className="invalid-feedback">{x.msg}</div>);
  };
  return (
    <>
      <button
        onClick={() => {
          console.log(errors);
        }}
      >
        ddd
      </button>
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
        {errors && errors.errors.map((x) => <div className="">{x.msg} </div>)}
        <form onSubmit={handleSubmit} className="form-reg" noValidate>
          <div className="row flreg">
            <div className="mb-2 col-6 fname singup-input">
              <input
                type="text"
                placeholder="First Name"
                className={`form-control fname ${setInvalidClass(
                  "formData.first_name"
                )}`}
                onChange={handleChange}
                name="first_name"
                value={formData.first_name}
              />
              {errors && filterErrMsg("formData.first_name")}
            </div>
            <div className="mb-2 col-6 fname singup-input">
              <input
                className={`form-control lname ${setInvalidClass(
                  "formData.last_name"
                )}`}
                type="text"
                placeholder="Last name"
                onChange={handleChange}
                name="last_name"
                value={formData.last_name}
                id="Lname"
              />
              {errors && filterErrMsg("formData.last_name")}
            </div>
          </div>
          <div className="mb-2">
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className={`form-control signup-input ${setInvalidClass(
                "formData.email"
              )}`}
            />
            {errors && filterErrMsg("formData.email")}
          </div>
          <div className="mb-2 has-validation">
            <input
              type="password"
              placeholder="New Password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              className={`form-control signup-input ${setInvalidClass(
                "formData.password"
              )}`}
            />
            {errors &&
              filterErrMsg("formData.password")}
          </div>
          <div className="container d-flex align-items-center justify-content-center">
            <button className="btn btn-success mt-2 w25 px-5 btnstyle">
              Sign Up
            </button>
          </div>
          <div>
            <Link
              to="/login"
              className="text-decoration-none text-center create-post-font"
            >
              <p>Already have an account?</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

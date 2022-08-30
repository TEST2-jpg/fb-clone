import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ token, setToken, setuserId, sp, ps }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginErr, setLoginErr] = useState(null)

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
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const response = await jsonData.json();
      if (jsonData.status === 403)
        setLoginErr(response.mess)
      await setToken(response.token);
      await setuserId(response._id);
      if (response.token) navigate("/");
    } catch (error) {
      console.log(error);
    }
    setFormData({ email: "", password: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    logUser();
  };
  return (
    <div className="padt72 padb112">
      {/* <Nav/> */}
      <div className="h536">
        <div className="login-container border p-3 bg-light shadow rounded-3">
          <form onSubmit={handleSubmit} className="form-log">
            <input
              type="email"
              placeholder="Email or phone number"
              className="form-control px-3 pt-14 bg-light"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
            <input
              type="password"
              className="form-control px-3 pt-14 bg-light"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
            <p className="logerr text-center">{loginErr}</p>
            <button class="btn btn-primary btnstyle">Log In</button>
          </form>
          <div className="frgtpw mb-3">Forgot password?</div>
          <hr className="w-100 m-auto" />
          <div className="d-flex justify-content-center py-4">
            <Link to="/reg" className="styl-none">
              <button className="cnabtn btn btn-success">
                Create new account
              </button>
            </Link>
          </div>
          <button
            onClick={async () => {
              try {
                const response = await fetch("http://localhost:8080/pro", {
                  headers: { Authorization: "Bearer " + token },
                });
                await setuserId(response.json());
              } catch (error) {
                console.log(error);
              }
            }}
          >
            FETCH PRO
          </button>
          <button
            onClick={() => {
              console.log(token);
              console.log(typeof token);
              sp("yeahh babyy!!");
              console.log(ps);
            }}
          >
            Console logger
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

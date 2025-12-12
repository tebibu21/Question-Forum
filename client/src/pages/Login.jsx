import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "../styles/Login.css"; // 👈 Import the new CSS file
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for password visibility

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      // Removed the alert here to allow navigation to happen smoothly
      // alert("login successful");

      localStorage.setItem("token", data.token);
      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section className="login-page-container">
      <div className="login-form-area">
        <div className="auth-form-card">
          <h2 className="form-title">Login to your account</h2>
          <p className="already-account">
            Don't have an account?{" "}
            <Link to={"/register"} className="signin-link">
              Create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <input
                ref={emailDom}
                type="email"
                placeholder="Email"
                className="form-input"
                required
                aria-label="Email"
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="form-group password-group">
              <input
                ref={passwordDom}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="form-input"
                aria-label="Password"
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>

          <p className="already-account-bottom">
            <Link to={"/register"}>Create an account?</Link>
          </p>
        </div>
      </div>

      {/* Keeping the about section for a consistent look with the register page */}
      <div className="about-section">
        <p className="about-title">About</p>
        <h3 className="qa-network-title">Question Forum Q&A</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
          voluptatibus officiis beatae nobis pariatur omnis facere accusamus
          laboriosam hic, adipisci vero reiciendis, recusandae et sit, eum
          quisquam? Molestias, ut commodi!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
          voluptatibus officiis beatae nobis pariatur omnis facere accusamus
          laboriosam hic, adipisci vero reiciendis, recusandae et sit, eum
          quisquam? Molestias, ut commodi!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum dolor
          odio harum sunt, quaerat, molestias fuga expedita ad excepturi
          officiis aliquam aut nemo ratione culpa id laborum ipsum porro
          tempore?
        </p>
        <button className="how-it-works-btn">HOW IT WORKS</button>
      </div>
    </section>
  );
}

export default Login;

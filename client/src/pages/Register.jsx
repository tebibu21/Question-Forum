import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosConfig";
import "../styles/Register.css"; // 👈 Import the new CSS file
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for password visibility

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passValue
    ) {
      alert("please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successful. please login");
      navigate("/login");
    } catch (error) {
      alert("something went wrong");
      console.log(error.response);
    }
  }

  // Helper component to display input fields with labels/placeholders
  const LabeledInput = ({ domRef, type = "text", placeholder, label }) => (
    <div className="form-group">
      {/* Keeping the ref attribute for backend logic */}
      <input
        ref={domRef}
        type={type}
        placeholder={placeholder}
        className="form-input"
        aria-label={label}
        required // Added required attribute for better UX
      />
    </div>
  );

  return (
    <section className="register-page-container">
      <div className="register-form-area">
        <div className="auth-form-card">
          <h2 className="form-title">Join the network</h2>
          <p className="already-account">
            Already have an account?{" "}
            <Link to={"/login"} className="signin-link">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="register-form">
            <LabeledInput
              domRef={emailDom}
              type="email"
              placeholder="Email"
              label="Email"
            />

            <div className="name-group">
              <LabeledInput
                domRef={firstnameDom}
                placeholder="First Name"
                label="First Name"
              />
              <LabeledInput
                domRef={lastnameDom}
                placeholder="Last Name"
                label="Last Name"
              />
            </div>

            <LabeledInput
              domRef={usernameDom}
              placeholder="User Name"
              label="User Name"
            />

            {/* Password field with toggle for visibility */}
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
              Agree and Join
            </button>
          </form>

          <div className="terms-agreement">
            <p>
              I agree to the{" "}
              <a href="#privacy" className="agreement-link">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="#terms" className="agreement-link">
                terms of service.
              </a>
            </p>
            <p className="already-account-bottom">
              <Link to={"/login"}>Already have an account?</Link>
            </p>
          </div>
        </div>
      </div>

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

export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Travel from "../assets/Travel.jpg";
import "./Login.css";

export default function Login() {

  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const users = JSON.parse(localStorage.getItem("travelUsers")) || [];

    /* =========================
       SIGN UP
    ========================= */

    if (isSignUp) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.mobile ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill all the fields.");
        return;
      }

      if (!formData.email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }

      if (formData.mobile.length !== 10) {
        setError("Mobile number must contain 10 digits.");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      let existingUser = null;

      for (const user of users) {
        if (user.email === formData.email) {
          existingUser = user;
          break;
        }
      }

      if (existingUser) {
        setError("An account with this email already exists.");
        return;
      }

      const newUser = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      };

      users.push(newUser);

      localStorage.setItem("travelUsers", JSON.stringify(users));

      setSuccess("Account created successfully. Please login.");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
      setIsSignUp(false);
      return;
    }

    /* =========================
       LOGIN
    ========================= */

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    let loggedUser = null;

    for (const user of users) {
      if (
        user.email === formData.email &&
        user.password === formData.password
      ) {
        loggedUser = user;
        break;
      }
    }

    if (!loggedUser) {
      setError("Invalid email or password.");
      return;
    }

    /* Save logged-in user */

    localStorage.setItem(
      "travelUser",
      JSON.stringify(loggedUser)
    );

    /* Navigate to dashboard */

    navigate("/Dashboard");
  };

  const handleModeChange = () => {
    setIsSignUp(!isSignUp);

    setError("");
    setSuccess("");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="loginPage">

      {/* LEFT SIDE */}

      <div className="leftSide">
        <img src={Travel} alt="Travel" />

        <div className="travelOverlay">
          <h2>Explore The World</h2>

          <p>
            Discover beautiful destinations, plan amazing
            trips and create unforgettable memories.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="rightSide">

        <div className="loginForm">

          <h1>TrAvEliA</h1>

          <h2>
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h2>

          <p className="subtitle">
            {isSignUp
              ? "Create an account to start your journey"
              : "Login to continue your travel journey"}
          </p>

          <form onSubmit={handleSubmit}>

            {/* SIGNUP FIELDS */}

            {isSignUp && (
              <>
                <div className="inputGroup">
                  <label htmlFor="firstName">
                    First Name
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="inputGroup">
                  <label htmlFor="lastName">
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="inputGroup">
                  <label htmlFor="mobile">
                    Mobile Number
                  </label>

                  <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    placeholder="Enter 10 digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength="10"
                  />
                </div>
              </>
            )}

            {/* EMAIL */}

            <div className="inputGroup">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD */}

            <div className="inputGroup">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* CONFIRM PASSWORD */}

            {isSignUp && (
              <div className="inputGroup">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="errorMessage">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="successMessage">
                {success}
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="loginButton"
            >
              {isSignUp ? "Create Account" : "Login"}
            </button>

          </form>

          {/* SWITCH LOGIN / SIGNUP */}

          <div className="switchAccount">

            <span>
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>

            <button
              type="button"
              onClick={handleModeChange}
              className="switchButton"
            >
              {isSignUp ? "Login" : "Create Account"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
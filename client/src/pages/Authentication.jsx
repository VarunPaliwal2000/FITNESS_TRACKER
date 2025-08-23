import { useState } from "react";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Background from "../utils/Images/Background.png";
import LogoImg from "../utils/Images/Logo.png";
import "./Authentication.css";

const Logo = styled.img`
  z-index: 3;
  height: 42px;
`;

const Authentication = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`${flipped ? "container" : "container_flipped"}`}
      style={{
        background: `url(${Background}) center center/cover no-repeat`,
        backgroundColor: "#d6f2ef",
      }}
    >
      <div className={`card${flipped ? " flipped" : ""}`}>
        <div className="front">
          <div className="form">
            <SignIn />
          </div>
        </div>
        <div className="front image">
          <div class="welcome-box">
            <h1>Hellooo, fitness freak!!</h1>
            <p>
              To keep connected with us please
              <br />
              login with your personal info
            </p>
            <button className="signin-link" onClick={() => setFlipped(true)}>
              Sign Up
            </button>
          </div>
        </div>
        <div className="back">
          <div>
            <SignUp />
          </div>
        </div>
        <div className="back image_flipped">
          <div className="creative-message">
            <div class="welcome-box flipped_box">
              <h1>Welcome, fitness freak!!</h1>
              <p>
                Lets know more about each other
                <br />
                sign up with your personal info
              </p>
              <button
                className="signin-link flipped_button"
                onClick={() => setFlipped(false)}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

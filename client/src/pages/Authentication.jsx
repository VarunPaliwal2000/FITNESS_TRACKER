import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import "./Authentication.css";

const Authentication = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`${flipped ? "container" : "container_flipped"}`}>
      <div className={`card${flipped ? " flipped" : ""}`}>
        <div className="front">
          <SignIn />
          <button className="signin-link" onClick={() => setFlipped(true)}>
            Sign Up if you dont have a account
          </button>
        </div>
        <div className="back">
          <SignUp />
          <button className="signin-link" onClick={() => setFlipped(false)}>
            Sign In if you have a account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

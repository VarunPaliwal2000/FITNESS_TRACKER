import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { UserSignIn } from "../api";
import { loginSuccess } from "../redux/reducer/userSlice";
import Buttons from "./Buttons";
import TextInput from "./TextInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-wodth: 500px;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary_front};
`;
const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary_front};
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (validateInputs()) {
      await UserSignIn({ email, password }).then((res) => {
        dispatch(loginSuccess(res.data));
        alert("Login Success");
      });
    }
  };
  return (
    <Container>
      <div>
        <Title>Welcome to fitness tracker </Title>
        <Text>Please login </Text>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Email"
          placeholder="Enter Email"
          value={email}
          handelChange={(e) => setemail(e.target.value)}
        />
        <TextInput
          password
          label="Password"
          placeholder="Enter Password"
          value={password}
          handelChange={(e) => setpassword(e.target.value)}
        />
        <Buttons text="Sign In" onClick={handleSignIn} />
      </div>
    </Container>
  );
};

export default SignIn;

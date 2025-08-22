import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { UserSignUp } from "../api";
import { loginSuccess } from "../redux/reducer/userSlice";
import Buttons from "./Buttons";
import TextInput from "./TextInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 36px;
  // max-width: 500px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary_back};
`;
const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary_back};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
  margin-bottom: 22px;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const validateInputs = () => {
    if (!email || !password || !name) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };
  const handleSignUp = async () => {
    if (validateInputs) {
      await UserSignUp({ email, name, password }).then((res) => {
        dispatch(loginSuccess(res.data));
        alert("Sign Up success");
      });
    }
  };
  return (
    <Container>
      <div>
        <Title>Welcome to fitness tracker </Title>
        <Text>Please sign up </Text>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <Grid>
          <TextInput
            label="First Name"
            placeholder="First Name"
            value={name}
            handelChange={(e) => setName(e.target.value)}
            side="back"
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            value={name}
            side="back"
            handelChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email"
            placeholder="Enter Email"
            value={email}
            side="back"
            handelChange={(e) => setemail(e.target.value)}
          />
          <TextInput
            password
            label="Password"
            placeholder="Enter Password"
            value={password}
            side="back"
            handelChange={(e) => setpassword(e.target.value)}
          />
        </Grid>
        <Buttons text="Sign Up" onClick={handleSignUp} />
      </div>
    </Container>
  );
};

export default SignUp;

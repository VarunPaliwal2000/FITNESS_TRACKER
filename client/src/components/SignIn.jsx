import React, { useState } from "react";
import { styled } from "styled-components";
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
  color: ${({ theme }) => theme.text_primary};
`;
const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignIn = () => {
  const [password, setpassword] = useState("");
  const [emailId, setemailId] = useState("");
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
          value={emailId}
          handelChange={(e) => setemailId(e.target.value)}
        />
        <TextInput
          password
          label="Password"
          placeholder="Enter Password"
          value={password}
          handelChange={(e) => setpassword(e.target.value)}
        />
        <Buttons text="Sign In" />
      </div>
    </Container>
  );
};

export default SignIn;

import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import styled from "styled-components";
import useLogin from "./useLogin";

const Label = styled.label`
  margin: 7px;
  margin-left: 0;
  font-size: 2rem;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading: isLogingIn, mutate: login } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="email">Email: </Label>
      <Input
        type="email"
        id="email"
        // This makes this form better for password managers
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLogingIn}
      />
      <Label htmlFor="password">Password: </Label>
      <Input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLogingIn}
      />
      <div
        style={{
          margin: "7px",
          marginLeft: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button size="large" disabled={isLogingIn}>
          Login
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;

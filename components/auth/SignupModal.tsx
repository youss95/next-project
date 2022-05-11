import React, { useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal_close_x_icon.svg";
import Input from "../common/Input";
const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
`;

const SignupModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onChangeLastname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastname(e.target.value);
  };

  const onChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstname(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword((prev) => !prev);
  };
  return (
    <Container>
      <CloseXIcon className="mordal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          placeholder="email"
          type="email"
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="name"
          value={lastname}
          onChange={onChangeLastname}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="sex"
          value={firstname}
          onChange={onChangeFirstname}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="set password"
          type={hidePassword ? "password" : "text"}
          value={password}
          onChange={onChangePassword}
        />
        <span onClick={toggleHidePassword}>보이기</span>
      </div>
    </Container>
  );
};

export default SignupModal;

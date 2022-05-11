import React from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal_close_x_icon.svg";
import palette from "../../styles/palette";
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
    input {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 44px 0 11px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      ::placeholder {
        color: ${palette.gray_76};
      }
    }
    svg {
      position: absolute;
      right: 11px;
      top: 16px;
    }
  }
`;

const SignupModal: React.FC = () => {
  return (
    <Container>
      <CloseXIcon className="mordal-close-x-icon" />
      <div className="input-wrapper">
        <input placeholder="email" type="email" name="email" />
      </div>
      <div className="input-wrapper">
        <input placeholder="name" />
      </div>
      <div className="input-wrapper">
        <input placeholder="sex" />
      </div>
      <div className="input-wrapper">
        <input placeholder="set password" type="password" />
      </div>
    </Container>
  );
};

export default SignupModal;

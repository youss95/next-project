/* eslint-disable react/function-component-definition */
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import useModal from "../hooks/useModal";
import AirbnbLogoIcon from "../public/static/svg/airbnb_logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/airbnb_logo_text.svg";
import palette from "../styles/palette";
import SignupModal from "./auth/SignupModal";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;

//함수형 컴포넌트임을 타입을 선언
const Header: React.FC = () => {
  const { openModalPortal, ModalPortal, closeModal } = useModal();
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button
          type="button"
          className="header-sign-up-button"
          onClick={openModalPortal}
        >
          회원가입
        </button>
        <button type="button" className="header-login-button">
          로그인
        </button>

        <ModalPortal>
          <SignupModal closeModal={closeModal} />
        </ModalPortal>
      </div>
    </Container>
  );
};

export default Header;

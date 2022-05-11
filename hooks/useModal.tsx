/* eslint-disable react/function-component-definition */
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
  .on {
    transition: all 0.3s ease-out;
  }
  @keyframes FadeIn {
    0% {
      opacity: 0;
    }
    1% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes FadeOut {
    0% {
      opacity: 1;
    }
    1% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
//useModal 훅에 Modal컴포넌트 , 함수포함
const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModalPortal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  interface IProps {
    children: React.ReactNode; //해당 props의 타입 지정
  }
  //createPortal :무엇을 ,어디에
  //React.FC : 이 변수의 타입은 함수이다. 함수타입
  const ModalPortal: React.FC<IProps> = ({ children }) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.getElementById("root-modal");
        ref.current = dom;
      }
    }, []);
    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container>
          <div
            className={["modal-background", modalOpened ? "on" : ""].join(" ")}
            role="presentation"
            onClick={closeModal}
          />
          {children}
        </Container>,
        ref.current
      );
    }
    return null;
  };

  return {
    openModalPortal,
    closeModal,
    ModalPortal,
  };
};
export default useModal;

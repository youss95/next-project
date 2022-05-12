/* eslint-disable react/function-component-definition */
import React from "react";
import styled from "styled-components";

const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 5px;
`;

const Button: React.FC = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Button;

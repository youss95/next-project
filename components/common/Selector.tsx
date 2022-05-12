import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div`
  width: 100%;
  height: 46px;
  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none; //셀렉트 화살표 없애기
    background-image: url("/static/svg/selector/selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  value?: string;
  disabledOptions?: string[];
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  ...props
}) => {
  return (
    <Container>
      <select {...props}>
        {options?.map((option, index) => (
          <option
            key={index}
            value={option}
            disabled={disabledOptions.includes(option)}
          >
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Selector;
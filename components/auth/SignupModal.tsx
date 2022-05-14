import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal_close_x_icon.svg";
import Input from "../common/Input";
import Selector from "../common/Selector";
import { dayList, monthList, yearList } from "../../lib/staticData";
import palette from "../../styles/palette";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
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
  .sign-up-birthdat-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }
  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
`;

// eslint-disable-next-line react/function-component-definition
const SignupModal: React.FC = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const dispatch = useDispatch();
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(e.target.value);
    },
    []
  );

  const onChangeLastname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setLastname(e.target.value);
    },
    []
  );

  const onChangeFirstname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFirstname(e.target.value);
    },
    []
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(e.target.value);
    },
    []
  );

  const toggleHidePassword = useCallback(() => {
    setHidePassword((prev) => !prev);
  }, []);

  const onChangeBirthMonth = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setBirthMonth(e.target.value);
    },
    []
  );

  const onChangeBirthDay = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setBirthDay(e.target.value);
    },
    []
  );

  const onChangeBirthYear = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setBirthYear(e.target.value);
    },
    []
  );

  const onSubmitSignUp = async (event) => {
    event.preventDefault();
    console.log("sss");
    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(),
      };
      const { data } = await signupAPI(signUpBody);
      console.log("data", data);
      dispatch(userActions.setLoggedUser(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
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
      <p className="sign-up-birthdat-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 가입할 수 있습니다. 생일은 다른 에어비앤비
        이용자에게 공개되지 않습니다.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={["월", ...monthList]}
            disabledOptions={["월"]}
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={["일", ...dayList]}
            disabledOptions={["일"]}
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={["년", ...yearList]}
            disabledOptions={["년"]}
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입</Button>
      </div>
    </Container>
  );
};

export default React.memo(SignupModal);

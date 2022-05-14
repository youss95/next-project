import axios from ".";
import { UserType } from "../../types/user";

interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

//* 회원 가입 api
export const signupAPI = (body) => {
  console.log(body);
  return axios.post("/api/auth/signup", body);
};

//* 로그인 api
export const loginAPI = (body) => axios.post<UserType>("/api/auth/login", body);

//* 로그 아웃 api
export const logoutAPI = () => axios.delete("/api/auth/logout");

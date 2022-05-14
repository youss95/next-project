import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //* 계정 생성하기
  if (req.method === "POST") {
    console.log("sss", req);
    //* 값을 받았는지 확인
    const {
      body,
    }: {
      body;
    } = req;
    console.log("b", body);
    const { email, firstname, lastname, password, birthday } = body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    const users = await Data.user.getList();
    const hashedPassword = bcrypt.hashSync(password, 8);
    let newUser;
    if (users.length === 0) {
      newUser = {
        ...req.body,
        id: 1,
        password: hashedPassword,
        profileImage: "/static/image/default_user_profile_image.jpg",
      };
      Data.user.write([...users, newUser]);
    } else {
      const userExists = await Data.user.exist({ email });
      if (userExists) {
        res.statusCode = 409;
        return res.send("이미 가입한 이메일 입니다.");
      }
      //* 유저가 비어있다면 Id는 1 아니라면 마지막 유저 id +1
      const newTodoId = users.length === 0 ? 1 : users[users.length - 1].id + 1;

      //* 유저의 password bcrypt 암호화
      newUser = {
        ...req.body,
        id: newTodoId,
        password: hashedPassword,
        profileImage: "/static/image/default_user_profile_image.jpg",
      };
      users.push(newUser);
      Data.user.write(users);
    }

    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET);
    console.log(token);
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; Path=/; Expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
      ).toUTCString()}; HttpOnly`
    );

    console.log("unew", newUser);

    res.statusCode = 200;
    return res.send(newUser);
  }
  //res.statusCode = 405;

  return res.end();
};

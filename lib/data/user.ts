import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";

const getList = async () => {
  const usersBuffer = readFileSync("data/users.json");
  const usersString = usersBuffer.toString();
  if (!usersString) {
    return [];
  }
  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

//* 유저 여부 검색하기
const exist = async ({ id, email }: { id?: number; email?: string }) => {
  try {
    const users = await getList();
    const userExist = users.some(
      (user) => user.id === id || user.email === email
    );
    return userExist;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//* 유저 저장하기
const write = async (users: StoredUserType[]) => {
  writeFileSync("data/users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err.message);
      throw Error("데이터 저장 에러");
    }
  });
};

export default { getList, exist, write };

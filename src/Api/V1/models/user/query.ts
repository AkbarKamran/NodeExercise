import user from "./index";
import { userInterface } from "../interfaces/user";
const verifyUser = async (email: string) => {
  try {
    const verify = await user.findOne({ email: email }).lean();
    return verify;
  } catch (error) {
    throw error;
  }
};

const getUser = async (email: string) => {
  const userData: userInterface = await user
    .findOne({ email: email })
    .select({ _id: 1, email: 1 });
  return userData;
};

const addUser = async (email: string, password: string) => {
  try {
    const newUser = new user({
      email: email,
      password: password,
    });
    return newUser
      .save()
      .then((data: { _id: string; email: string }) => {
        // console.log(JSON.stringify(data));
        return data;
      })
      .catch((err: any) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
};

export { addUser, verifyUser, getUser };

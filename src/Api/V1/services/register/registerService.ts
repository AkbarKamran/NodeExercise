import { createToken } from "../../middleware/middleware";
import {
  convertHash,
  verifyHash,
} from "../../lib/dataManipulations/hashing/hash";
import { addUser, verifyUser } from "../../models/user/query";
export default new (class registerService {
  serviceRegisterUser = async (email: string, password: string) => {
    try {
      const valid = await verifyUser(email);
      if (valid?.email) {
        return [];
      }
      let hashPassword: string = await convertHash(password);
      const saveUser: { _id: string; email: string } = await addUser(
        email,
        hashPassword
      );
      return [{ id: saveUser._id, email: saveUser.email }];
    } catch (error) {
      throw error;
    }
  };
})();

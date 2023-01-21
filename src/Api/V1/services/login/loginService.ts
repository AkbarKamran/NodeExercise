import { addUser, verifyUser } from "../../models/user/query";
import { createToken } from "../../middleware/middleware";
import { verifyHash } from "../../lib/dataManipulations/hashing/hash";
export default new (class loginService {
  public login = async (email: string, password: string) => {
    try {
      const userExist = await verifyUser(email);
      // console.log("User====", userExist);
      if (userExist?.email) {
        const verifyPassword: boolean = await verifyHash(
          password,
          userExist.password
        );
        if (verifyPassword) {
          const token: string = createToken({ email: userExist.email });
          return [
            {
              jwt: token,
            },
          ];
        }
        return [];
      }
      return [];
    } catch (error) {
      throw error;
    }
  };
})();

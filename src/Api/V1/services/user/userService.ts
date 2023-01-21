import { getUser } from "../../models/user/query";
import { userInterface } from "Api/V1/models/interfaces/user";
export default new (class userService {
  public user = async (email: string) => {
    const userExist: userInterface = await getUser(email);
    return { user: userExist };
  };
})();

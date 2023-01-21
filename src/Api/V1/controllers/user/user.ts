import { Request, Response } from "express";
import Joi from "joi";
import userService from "../../services/user/userService";
import {
  successResponseV2,
  dbErrorV2,
  internalServerErrorV2,
} from "../../lib/helpers/response/responseHandler";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
});
import { userInterface } from "Api/V1/models/interfaces/user";

export default new (class userController {
  getUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const { error } = userSchema.validate(req.body);

      if (error) return successResponseV2(400, false, error.message, {}, res);
      try {
        const data: { user: userInterface } = await userService.user(email);

        return successResponseV2(200, true, "success", data, res);
      } catch (error: any) {
        dbErrorV2(error.message, res);
      }
    } catch (error: any) {
      internalServerErrorV2("Server Error", error.message, res);
    }
  };
})();

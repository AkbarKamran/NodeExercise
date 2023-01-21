import { Request, Response } from "express";
import Joi from "joi";
import loginService from "../../services/login/loginService";
import {
  successResponseV2,
  dbErrorV2,
  internalServerErrorV2,
} from "../../lib/helpers/response/responseHandler";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default new (class loginController {
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { error } = userSchema.validate(req.body);

      if (error) return successResponseV2(400, false, error.message, {}, res);
      try {
        const data: { jwt: string }[] = await loginService.login(
          email,
          password
        );
        if (data.length == 0) {
          return successResponseV2(
            400,
            false,
            "Inavlid email or password",
            {},
            res
          );
        }
        return successResponseV2(200, true, "success", data[0], res);
      } catch (error: any) {
        dbErrorV2(error.message, res);
      }
    } catch (error: any) {
      internalServerErrorV2("Server Error", error.message, res);
    }
  };
})();

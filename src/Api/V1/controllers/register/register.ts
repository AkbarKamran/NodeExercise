import { Request, Response } from "express";
import Joi from "joi";
import registerService from "../../services/register/registerService";
import {
  internalServerErrorV2,
  successResponseV2,
  dbErrorV2,
} from "../../lib/helpers/response/responseHandler";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export class RegisterController {
  registerUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { error } = userSchema.validate(req.body);
      if (error) {
        successResponseV2(400, false, error.message, {}, res);
      } else {
        try {
          let data: { id: string; email: string }[] =
            await registerService.serviceRegisterUser(email, password);
          if (data.length == 0) {
            return successResponseV2(
              400,
              false,
              "Email Already exist",
              {},
              res
            );
          }
          return successResponseV2(
            201,
            true,
            "User Register Successfully",
            { user: data[0] },
            res
          );
        } catch (error: any) {
          // console.log("errorr in controller");
          dbErrorV2(error.message, res);
        }
      }
    } catch (error: any) {
      internalServerErrorV2("Server Error", error.message, res);
    }
  };
}

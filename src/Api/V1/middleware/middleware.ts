import { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { successResponse } from "../lib/helpers/response/responseHandler";
const secretKey: string = process.env.ACCESS_TOKEN_KEY as string;
config();
function createToken(userObject: Object): string {
  try {
    const token = sign(userObject, secretKey);
    return token.toString();
  } catch (error) {
    throw error;
  }
}
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
    // console.log(token);

    if (token == null)
      return successResponse(404, "No Token", [{ data: "" }], res);
    verify(
      token,
      process.env.ACCESS_TOKEN_KEY as string,
      (err: any, user: any) => {
        if (err)
          return successResponse(404, "Invalid Token", [{ data: "" }], res);

        req.body.email = user.email;
        next();
      }
    );
  } catch (error) {
    res.send(error);
  }
}
export { createToken, authenticateToken };

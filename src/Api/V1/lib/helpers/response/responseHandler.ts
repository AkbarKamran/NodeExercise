import { Response, Request } from "express";
function successResponse(code: any, message: string, data: any, res: any) {
  res.status(code).send({
    code: code.toString(),
    status: true,
    message: message,
    data: data,
  });
}
function successResponseV2(
  code: number,
  status: boolean,
  message: string,
  data: any,
  res: Response
) {
  res.status(code).send({
    code: code.toString(),
    status: status,
    message: message,
    data: data,
  });
}

function internalServerError(message: String, err: any, res: any) {
  res.status(500).send({
    header: {
      code: "500",
      status: true,
      message: message,
    },
    data: err,
  });
}
function internalServerErrorV2(message: String, err: string, res: Response) {
  res.status(500).send({
    code: "500",
    status: false,
    message: "Server Error",
    error: err,
  });
}

function dbError(err: any, res: any) {
  res.status(500).send({
    header: {
      code: "500",
      status: true,
      message: "sql_Db Error",
    },
    data: err,
  });
}
function dbErrorV2(err: any, res: any) {
  res.status(500).send({
    code: "500",
    status: false,
    message: "Mongo_Db Error",
    error: err,
  });
}

export {
  successResponse,
  internalServerError,
  dbError,
  internalServerErrorV2,
  dbErrorV2,
  successResponseV2,
};

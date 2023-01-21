import { Request, Response, NextFunction } from "express";
import { createTask, getTask } from "Api/V1/models/interfaces/tasks";
import taskService from "../../services/task";
import {
  successResponseV2,
  dbErrorV2,
  internalServerErrorV2,
} from "../../lib/helpers/response/responseHandler";
import Joi from "joi";

const createTaskSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});
export default new (class taskController {
  createTask = async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const { error } = createTaskSchema.validate(req.body);
      if (error) {
        return successResponseV2(400, false, error.message, {}, res);
      }
      try {
        const data: { task: { id: string; name: string } } =
          await taskService.saveTaskDetails(name, email);
        return successResponseV2(
          201,
          true,
          "Post Created Successfully",
          data,
          res
        );
      } catch (error: any) {
        dbErrorV2(error.message, res);
      }
    } catch (error: any) {
      internalServerErrorV2("Server Error", error.message, res);
    }
  };

  getAllTasks = async (req: Request, res: Response) => {
    try {
      try {
        const data: getTask = await taskService.getTasks();
        return successResponseV2(
          200,
          true,
          "Get all Post Successfully",
          data,
          res
        );
      } catch (error: any) {
        dbErrorV2(error.message, res);
      }
    } catch (error: any) {
      internalServerErrorV2("Server Error", error.message, res);
    }
  };
})();

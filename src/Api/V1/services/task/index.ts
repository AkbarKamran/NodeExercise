import { saveTaskPost, getAllTasks } from "../../models/task/query";
import { createTask, getTask } from "Api/V1/models/interfaces/tasks";
export default new (class taskService {
  saveTaskDetails = async (name: string, email: string) => {
    try {
      const data: createTask = await saveTaskPost(name, email);
      return { task: { id: data._id, name: data.name } };
    } catch (error: any) {
      throw error.message;
    }
  };

  getTasks = async () => {
    try {
      const data: getTask = await getAllTasks();
      return data;
    } catch (error: any) {
      throw error.message;
    }
  };
})();

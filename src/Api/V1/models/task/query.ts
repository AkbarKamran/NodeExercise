// import blogPost from "./index";
import task from "./index";
import { createTask, getTask } from "../interfaces/tasks/index";
const saveTaskPost = async (name: string, email: string) => {
  const newTask = new task({
    name,
    email,
  });
  return newTask
    .save()
    .then((data: createTask) => {
      return data;
    })
    .catch((err: any) => {
      // console.log("Error saving blog", err);
      throw err;
    });
};

const getAllTasks = async () => {
  try {
    const alltasks: getTask = await task.find({}).select({ _id: 1, name: 1 });
    // console.log("All tasks", alltasks);
    return alltasks;
  } catch (error) {
    throw error;
  }
};

export { saveTaskPost, getAllTasks };

import registerRoute from "./register";
import loginRoute from "./login";
import user from "./user";
import tasks from "./tasks";

const router = [tasks, registerRoute, loginRoute, user];

const registerRouter = (app: any) => {
  router.map((route) => {
    app.use("/api", route);
  });
};

export default registerRouter;

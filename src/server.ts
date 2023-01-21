var http = require("http");
import { config } from "dotenv";
config();
import App from "./app";
const mongoose = require("mongoose");

const apps = new App().app;
var httpServer = http.createServer(apps);
const PORT = process.env.PORT || 3000;
const start = () => {
  httpServer.listen(PORT, () => {
    console.log(`Server is running:  http://localhost:${PORT}`);
  });
  mongoose.set("strictQuery", true);
  mongoose
    .connect(
      "mongodb+srv://admin:admin@cluster0.fj4ztzd.mongodb.net/testDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((error: any) => {
      console.log(error);
    });
};
start();

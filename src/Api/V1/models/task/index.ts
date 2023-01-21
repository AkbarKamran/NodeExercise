const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const task: any = mongoose.model("tasks", taskSchema);
export default task;

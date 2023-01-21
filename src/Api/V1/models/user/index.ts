const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const user: any = mongoose.model("user", userSchema);
export default user;

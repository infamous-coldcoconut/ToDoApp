import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;

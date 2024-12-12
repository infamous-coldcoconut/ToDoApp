import User from "../../models/user.model.js";
import { createUserSchema } from "../../validation/user.validation.js";

const createUser = async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const duplication = await User.findOne({ name: value.name });

    if (duplication) {
      return res.status(404).json({ message: "User already exist" });
    }

    const user = await User.create(value);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    res.status(200).json({ id: user._id, name: user.name });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createUser, loginUser };

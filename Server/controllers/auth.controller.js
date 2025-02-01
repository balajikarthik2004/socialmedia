import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    // check if username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const newUser = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPassword,
    });
    console.log(newUser);

    // save the user
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    // find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "User not found" }); // user not found

    // check password validity
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong Password" }); // incorrect password
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser };

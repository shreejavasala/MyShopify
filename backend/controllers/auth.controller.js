import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  // validate request
  if(!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });

    if(userAlreadyExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user 
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    if(!newUser) {
      return res.status(400).json({ success: false, message: "Error creating new user" });
    } 

    res.status(201).json({ 
      success: true, 
      message: `new user ${username} created successfully`,
      user: {
        ...newUser.toObject(),
        password: undefined
      }
    });
    
  } catch (error) {
    console.log(`Error signing up the user: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const Login = async (req, res) => {
  const { email, password } = req.body;

  // validate request
  if(!email || !password) {
    return res.status(400).json({ success: false, message: "Email and Password are required" });
  }
  try {
    // check if the user exists
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password"});
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.status(200).json({
      success: true,
      token,
      message: "Login successful",
      user: {
        ...user.toObject(),
        password: undefined
      }
    });
  } catch (error) {
    console.log(`Error logging in: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}

export const Profile = async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.findById(userId).select("-password");
    if(!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(`Error in fetching user profile: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
}
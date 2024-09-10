const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  console.log("yyyyyyyyyyyyyyyyyy", req.body);

  const user = new User({ username, email, password: hashedPassword });

  try {
    await user.save();
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    //    next(error);
    next(
      errorHandler(
        550,
        `you are getting the error from error util, error:${error} `
      )
    );
  }
};
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const isValidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "Wrong Credentials!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password: pass,  ...otherDetails} = validUser._doc;


    
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherDetails);
  } catch (error) {
    next(error);
    // next(errorHandler(550,`you are getting the error from error util, error:${error} `));
  }
};

module.exports = { signup, signin };

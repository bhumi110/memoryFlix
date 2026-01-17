 const bcrypt=require("bcryptjs");
const User=require("../model/User.model.js");
const Series=require("../model/Series.model.js");
const Video=require("../model/Video.model.js");
const { generateToken }=require("../utils/jwt.js");

//-----------------signup---------------------------------------------
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    passwordHash
  });

  const token = generateToken(user._id);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

//------------------------------login------------------------------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

//---------------logged in user fetch-------------------------------
exports.getMe = async (req, res) => {
  res.json(req.user);
};


//-----------check if user has any post--------------------
exports.status= async (req, res) => {
  const seriesCount = await Series.countDocuments({ userId: req.user._id });
const videoCount = await Video.countDocuments({ userId: req.user._id });

  res.json({
    hasSeries: seriesCount > 0,
    hasVideos: videoCount > 0,
    shouldBrowse: seriesCount > 0 || videoCount > 0,
  });
};

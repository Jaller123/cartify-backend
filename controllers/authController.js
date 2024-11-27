const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username });
      if (user) return res.status(400).json({ message: "User already exists" });

      user = new User ({ username, password });
      await user.save();
      console.log("User save succesfully")

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'})
      res.status(201).json({ message: "User registered succesfully ",
        token, 
        user: {id: user._id, username: user.username}
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }   
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials"});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials"});

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({ token, user: { id: user._id, username: user.username }})
  } catch (error) {
    res.status(500).json({ message: "Server error", error})
  }
}
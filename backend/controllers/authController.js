const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email, and password');
  }

  const normalizedUsername = (username || email.split('@')[0]).trim().toLowerCase();
  const existingUser = await User.findOne({
    $or: [{ email }, ...(normalizedUsername ? [{ username: normalizedUsername }] : [])],
  });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    username: normalizedUsername,
    password: hashedPassword,
    role: 'user',
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!password || (!email && !username)) {
    res.status(400);
    throw new Error('Please provide email or username and password');
  }

  const query = email ? { email } : { username };
  const user = await User.findOne(query);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

module.exports = { registerUser, loginUser };

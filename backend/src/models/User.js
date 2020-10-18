const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);

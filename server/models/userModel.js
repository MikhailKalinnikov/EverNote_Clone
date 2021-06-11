const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Имя пользователя
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  // Мы не храним пароль, а только его хэш
  // Email
  email: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

module.exports = mongoose.model("Users", userSchema);

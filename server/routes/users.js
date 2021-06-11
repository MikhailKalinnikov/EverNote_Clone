const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.post("/api/logup", async function (req, res) {
  const { username, email, password } = req.body;
  const dubleEmail = await User.findOne({ email });
  if (dubleEmail) {
    return res.sendStatus(401);
  }
  try {
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashPass });
    await user.save();
    req.session.userID = user.id;
    req.session.username = user.username;
    res.json(req.session.username);
  } catch (error) {
    res.send("Ошибка регистрации");
  }
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return res.sendStatus(400).end();
    }
    if (await bcrypt.compare(password, currentUser.password)) {
      req.session.userID = currentUser.id;
      req.session.username = currentUser.username;
      res.json(req.session.username);
      console.log(req.session.username, "???????");
    } else {
      return res.sendStatus(401).end();
    }
  } catch (error) {
    res.send("Try again").status(418);
  }
});

router.get("/api/logout", (req, res) => {
  req.session.username
    ? req.session.destroy(() => {
        console.log("clearCookie");
        res.clearCookie("connnect.sid");
        res.end();
      })
    : res.end();
});

module.exports = router;

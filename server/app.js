const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dbConnect = require("./config/db");
dbConnect();
const dotenv = require("dotenv");
dotenv.config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "kjhgjgfjctygvkjvckt", // случайный набор символов для шифрования сессионных куков
    resave: true, // пересохранять сессию даже если ничего не изменилось
    saveUninitialized: false, // сохранять сессию при первом обращении к сайту
    cookie: { secure: false }, // опции сессионных куков ( secure - это httpS )
  })
);
app.use((req, res, next) => {
  res.locals.user = req.session?.username; // записываем в локалс имя юзера из сессии
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(8080, () => {
  console.log("start in port: 8080");
});
module.exports = app;

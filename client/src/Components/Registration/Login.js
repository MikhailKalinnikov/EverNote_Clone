import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./registration.module.css";

const Login = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();

    if (currentUser) {
      return;
    }
    const response = await fetch("http://localhost:8080/users/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 400) {
      setError("Пользователь не найден");
      setInputs({ email: "", password: "" });
    }
    if (response.status === 401) {
      setError("Неверные логин . пароль ");
      setInputs({ email: "", password: "" });
    }

    const resultOfFetch = await response.json();
    dispatch({ type: "IS_AUTH", payload: true });
    dispatch({ type: "CURRENT_USER", payload: resultOfFetch });
    setInputs({ email: "", password: "" });
    history.push("/");
  };
  const { password, email } = inputs;

  return (
    <div className="container loginSharm">
      <form className={styles.loginSharm} onSubmit={handlerSubmit}>
        <h6>Для входа введите свои данные:</h6>
        {error && <h5>{error}</h5>}
        <input
          name="email"
          type="email"
          id="staticEmail2"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          id="inputPassword2"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <button onClick={handlerSubmit} type="submit">
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;

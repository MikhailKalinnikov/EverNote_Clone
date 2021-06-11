import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const Logup = () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/users/api/logup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.status === 401) {
      setError("Пользователь с таким email уже существует");
      setInputs({ username: "", email: "", password: "" });
    }
    const resultOfFetch = await response.json();
    dispatch({ type: "IS_AUTH", payload: true });
    dispatch({ type: "CURRENT_USER", payload: resultOfFetch });
    setInputs({ username: "", email: "", password: "" });
    history.push("/");
  };
  const { username, email, password } = inputs;
  return (
    <div className="container login">
      {error && <h5>{error}</h5>}
      {currentUser ? (
        <h4>Hello, {currentUser}!!! </h4>
      ) : (
        <>
          <h6>для регистрации введите свои данные:</h6>&nbsp;
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-auto">
              <input
                name="username"
                type="text"
                className="form-control"
                id="staticEmail2"
                placeholder="Name"
                value={username}
                onChange={handleChange}
              />
            </div>

            <div className="col-auto">
              <input
                name="email"
                type="email"
                className="form-control"
                id="staticEmail2"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <input
                name="password"
                type="password"
                className="form-control"
                id="inputPassword2"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Enter
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Logup;

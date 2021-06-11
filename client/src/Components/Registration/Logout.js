import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await fetch("http://localhost:8080/users/api/logout");
    })();
    dispatch({ type: "IS_AUTH", payload: false });
    dispatch({ type: "CURRENT_USER", payload: "" });
  }, [dispatch]);
  history.push("/");
  return null;
};

export default Logout;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const isAuth = useSelector((state) => state.isAuth);
  return (
    <div>
      <div className="heading">
        <h1>Ever Note clone</h1>
      </div>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "lightsalmon" }}
      >
        <div className="container-fluid  justify-content-evenly">
          <Link to="/">Home</Link>
          {!isAuth ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/logup">Logup</Link>
            </>
          ) : (
            <>
              <Link to="/noteslist">Заметки</Link>
              <Link to="/inputnote">Добавить заметку</Link>
              <Link to="/logout">LogOut</Link>
              <Link to="#">Пользователь: {currentUser}</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Header;

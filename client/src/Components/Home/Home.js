import { useSelector } from "react-redux";
import styles from "./Home.module.css";

const Home = () => {
  const isAuth = useSelector(state=>state.isAuth)
  return (
    <div className="container">
      <div className={styles.wrapper}>
        {!isAuth ?
        <div className={styles.typing}>
          Зарегистрируйтесь или авторизуйтесь
        </div> :
        <div className={[styles.typing, styles.typing1].join(' ')}>
          Для выхода кликни "LogOut"
        </div> 
        }
      </div>
    </div>
  );
};

export default Home;

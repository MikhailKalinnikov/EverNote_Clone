import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const InfoOfNote = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const history = useHistory();
  const currentId = useParams().id;
  const currentNote = notes.find((el) => el.id === currentId);
  const [color, setColor] = useState(false);
  const style = {
    backgroundColor: color ? "yellow" : "#e3bef5",
  };
  const editingNote = () => {
    history.push(`/editing/${currentId}`);
  };
  const deleteNote = (currentId) => {
    dispatch({ type: "DELETE_NOTE", payload: currentId });
    history.push("/noteslist");
  };
  const changeStatus = (index) => {
    dispatch({ type: "CHANGE_STATUS", payload: { id: currentId, i: index } });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="card "
        style={style}
        onClick={() => setColor((pre) => !pre)}
      >
        <ul className="card-body infoNote ">
          <p align="center">Имя заметки:</p>
          <h3 align="center" className="card-text">
            {" "}
            {currentNote.name}
          </h3>
          {currentNote.options.map((el, i) => (
            <li key={el.id}>
              <input
                className="checkbox"
                type="checkbox"
                // defaultChecked='false'
                checked={currentNote.options[i].statusOfOption}
                onChange={() => changeStatus(i)}
              />
              &nbsp;
              <span
                className={el.statusOfOption === true ? "checkBoxTrue" : ""}
              >
                {el.text}
              </span>
            </li>
          ))}
          <Link to="#" onClick={() => editingNote(currentNote.id)}>
            редактировать
          </Link>
          &nbsp;&nbsp;
          <Link to="#" onClick={() => deleteNote(currentId)}>
            удалить заметку
          </Link>
        </ul>
        <Link to="/noteslist">
          <h6 align="center">Выйти</h6>
        </Link>
      </div>
    </div>
  );
};

export default InfoOfNote;

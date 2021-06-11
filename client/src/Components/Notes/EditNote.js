import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import uuid from "react-uuid";

const EditNote = ({ nameOfNewNote, setNameOfNewNote }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [optionsOfNewNote, setOptionsOfNewNote] = useState([]);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const saveNewOption = (e) => {
    if (input !== "") {
      setOptionsOfNewNote([
        ...optionsOfNewNote,
        { id: uuid(), text: input, statusOfOption: false },
      ]);
    }
    setInput("");
  };
  const saveNewNote = (e) => {
    dispatch({
      type: "ADD_NOTE",
      payload: {
        name: nameOfNewNote,
        status: false,
        id: uuid(),
        options: optionsOfNewNote,
      },
    });
    setNameOfNewNote("");
    history.push("/noteslist");
  };
  return (
    <div className="container card">
      <div className="card-body">
        <p className="card-text">Редактирование заметки:</p>
        <ul>
          <li>
            <h4 className="card-title">{nameOfNewNote}</h4>
            {optionsOfNewNote.length > 0 && (
              <ol>
                {optionsOfNewNote &&
                  optionsOfNewNote.map((el, i) => <li key={i}>{el.text}</li>)}
              </ol>
            )}
          </li>
        </ul>
      </div>
      <label htmlFor="input">текст заметки:</label>
      <input
        name="name"
        type="text"
        placeholder="текст заметки"
        onChange={handleChange}
        value={input}
      />
      <Link
        to="#"
        className="card-link_saveoption"
        onClick={(e) => saveNewOption()}
      >
        сохранить текст
      </Link>
      <div className="card-body">
        <Link to="#" className="card-link" onClick={(e) => saveNewNote()}>
          Сохранить заметку
        </Link>
        <Link
          to="/noteslist"
          className="card-link"
          onClick={() => setNameOfNewNote("")}
        >
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default EditNote;

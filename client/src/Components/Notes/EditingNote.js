import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

const EditingNote = () => {
  const notes = useSelector((state) => state.notes);
  const [elToEdit, setElToEdit] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [addInput, setAddInput] = useState(false);
  const currentId = useParams().id;
  const currentNote = notes.find((el) => el.id === currentId);
  const [inputName, setInputName] = useState(currentNote.name);
  const [inputOptions, setInputOptions] = useState(currentNote.options);
  const [newOption, setNewOption] = useState("");
  const [message, setMessage] = useState(null);

  const handleChangeName = (e) => {
    setInputName(e.target.value);
  };
  const handleClick = (id) => {
    setElToEdit(id);
    setAddInput(false);
    if (currentNote.options.length !== inputOptions.length) {
      setMessage("прежде сохраните изменения");
    }
  };
  const handleChangeOption = ({ target }) => {
    setInputOptions((pre) =>
      pre.map((option) =>
        option.id === elToEdit ? { ...option, text: target.value } : option
      )
    );
  };
  const addNewOption = ({ target }) => {
    setNewOption(target.value);
  };
  const SaveNewOption = () => {
    setInputOptions((pre) => [
      ...pre,
      { text: newOption, id: uuid(), statusOfOption: false },
    ]);
    setAddInput(false);
  };
  const handleSaveChange = (id) => {
    const resultInputOptions = inputOptions.filter(
      (option) => option.text !== ""
    );
    dispatch({
      type: "SAVE_CHANGE_OF_NOTE",
      payload: {
        id: currentNote.id,
        name: inputName,
        options: resultInputOptions,
      },
    });
    history.push(`/infonote/${id}`);
  };
  return (
    <div className="container d-flex justify-content-center">
      <div className="card ">
        <ul className="card-body infoNote ">
          <h5 align="center">Редактирование заметки</h5>
          <li>
            <sub>наименование заметки:</sub>
            <input name="name" onChange={handleChangeName} value={inputName} />
            {inputOptions.length > 0 && (
              <ul>
                <strong>текст заметки:</strong>
                {inputOptions.map((el, i) => (
                  <li key={el.id}>
                    {elToEdit === el.id ? (
                      <div>
                        <input
                          value={inputOptions[i].text}
                          onChange={handleChangeOption}
                        />
                      </div>
                    ) : (
                      <span onClick={() => handleClick(el.id)}>{el.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {addInput && (
              <ul>
                <label forHTML="input">новый текст:</label>
                <li>
                  {" "}
                  <input
                    placeholder="введите текст"
                    onChange={addNewOption}
                    value={newOption}
                  />
                  <Link to="#" onClick={SaveNewOption}>
                    <sub>сохранить</sub>
                  </Link>
                </li>
              </ul>
            )}
            <hr />
            {message && <h4 style={{ color: "red" }}>{message}</h4>}
            <Link to="#" onClick={() => [setAddInput(true), setElToEdit(null)]}>
              <sub>добавить текст заметки</sub>
            </Link>
            &nbsp; &nbsp;&nbsp;
            <Link to="/noteslist">
              <sub>Выйти</sub>
            </Link>
          </li>
        </ul>
        <button
          style={message ? { color: "red" } : null}
          onClick={() => handleSaveChange(currentNote.id)}
        >
          сохранить изменения
        </button>
      </div>
    </div>
  );
};

export default EditingNote;

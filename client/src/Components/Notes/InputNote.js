import { useState } from "react";
import EditNote from "./EditNote";

const InputNote = ({ props: { nameOfNewNote, setNameOfNewNote } }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = function (e) {
    if (input === "") {
      return;
    }
    setNameOfNewNote(input);
    setInput("");
  };
  return (
    <>
      {nameOfNewNote !== "" ? (
        <EditNote
          nameOfNewNote={nameOfNewNote}
          setNameOfNewNote={setNameOfNewNote}
        />
      ) : (
        <div className="container input-group mb-3  top5 d-flex justify-content-center">
          <form>
            <div className="mb-3">
              <div>
                <label className="form-label">Наименование заметки:</label>
              </div>
              <input
                name="name"
                type="text"
                className="inputnote"
                placeholder="наименование заметки"
                onChange={handleChange}
                value={input}
              />
            </div>
            <div>
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={(e) => handleClick()}
              >
                Создать заметку
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default InputNote;

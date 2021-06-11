import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const NotesList = () => {
  const history = useHistory();
  const notes = useSelector((state) => state.notes);

  const handleClick = (id) => {
    history.push(`/infonote/${id}`);
  };
  return (
    <div className="container input-group mb-3  top5 d-flex justify-content-center">
      <ul className="list-group top10">
        {notes.length > 0 && <h3>Ваши заметки:</h3>}
        {notes.length < 1 ? (
          <h3>Список заметок пуст</h3>
        ) : (
          <ul>
            {notes.map((el) => (
              <li
                key={el.id}
                className="active"
                aria-current="true"
                onClick={() => handleClick(el.id)}
              >
                {el.name}
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default NotesList;

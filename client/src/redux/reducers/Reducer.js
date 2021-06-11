import initState from "../initState";
const Reducer = (state = initState(), action) => {
  switch (action.type) {
    case "IS_AUTH":
      return {
        ...state,
        isAuth: action.payload,
      };
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        isAuth: action.payload,
      };
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
    case "SAVE_CHANGE_OF_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? {
                ...note,
                name: action.payload.name,
                options: action.payload.options,
              }
            : note
        ),
      };
    case "CHANGE_STATUS":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? {
                ...note,
                options: note.options.map((option, i) =>
                  i === action.payload.i
                    ? {
                        ...option,
                        statusOfOption:
                          option.statusOfOption === true ? false : true,
                      }
                    : option
                ),
              }
            : note
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    default:
      return state;
  }
};

export default Reducer;

// case "CHANGE_STATUS":
//   return {
//     ...state,
//     notes: state.notes.map((note) =>
//       note.id === action.payload ?
//          {...note, status: note.status === true ? false : true } :  note
//     ),
//   };

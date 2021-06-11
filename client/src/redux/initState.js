const initState = () => {
  const state = {
    notes: [],
    currentUser: "",
    isAuth: false,
  };
  const fromLS = JSON.parse(window.localStorage.getItem("Ever_Note"));
  return fromLS ? fromLS : state;
};

export default initState;

// ____________без локальных записей : ____________
// const initState = {
//   currentUser: '',
//   isAuth: false,
//   notes: []
// };

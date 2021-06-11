import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import EditingNote from "./Components/Notes/EditingNote";
import EditNotes from "./Components/Notes/EditNote";
import InfoOfNote from "./Components/Notes/InfoOfNote";
import InputNote from "./Components/Notes/InputNote";
import NotesList from "./Components/Notes/NotesList";
import Login from "./Components/Registration/Login";
import Logout from "./Components/Registration/Logout";
import Logup from "./Components/Registration/Logup";

function App() {
  const [nameOfNewNote, setNameOfNewNote] = useState("");
  return (
    <Router>
      <div className="container">
        <Header />
      </div>
      <Switch>
        <Route path="/logup">
          <Logup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/noteslist">
          <NotesList />
        </Route>
        <Route exact path="/infonote/:id">
          <InfoOfNote />
        </Route>
        <Route exact path="/editing/:id">
          <EditingNote />
        </Route>
        <Route path="/editnote">
          <EditNotes />
        </Route>
        <Route exact path="/inputnote">
          <InputNote props={{ nameOfNewNote, setNameOfNewNote }} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

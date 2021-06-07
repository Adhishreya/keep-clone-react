import "./styles.css";
import { useState, useEffect } from "react";
import { projectFirestore } from "./firebase/config.js";
import Editor from "./editor/Editor.js";
import BottomBar from "./bottomBar/BottomBar.js";
import firebase from "firebase";
const App = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  const [selectNoteIndex, setNodeIndex] = useState(null);
  const [selectNote, setSelectNote] = useState(null);
  const [note, setNote] = useState(null);
  const collection = "notes";
  useEffect(() => {
    firebase
      .firestore()
      .collection(collection)
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log(notes);
        setNote(notes);
      });
    // console.log(note);
  }, [collection]);

  // function selectNote() {
  //   console.log("select note");
  // }
  // const deleteNote = () => {
  //   console.log("delete note");
  // };
  return (
    <div className="app-container App">
      <h1>Keep</h1>
      <Editor />
      <BottomBar
        selectNoteIndex={selectNoteIndex}
        note={note}
        // selectNote={selectNote}
        // deleteNote={deleteNote}
      />
    </div>
  );
};

export default App;

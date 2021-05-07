import "./styles.css";
import { useState, useEffect } from "react";
import { projectFirestore } from "./firebase/config.js";
import Editor from "./editor/Editor.js";
import BottomBar from "./bottomBar/BottomBar.js";
import firebase from "firebase";
const App = () => {
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
  return (
    <div className="App">
      <h1>Keep</h1>
      <Editor />
      <BottomBar />
    </div>
  );
};

export default App;

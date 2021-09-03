import "./styles.css";
import { useState, useEffect, useMemo } from "react";
import { projectFirestore } from "./firebase/config.js";
import Editor from "./editor/Editor.js";
import BottomBar from "./bottomBar/BottomBar.js";
import firebase from "firebase";
import styles from './App.module.css';
import {Menu,Search,Refresh,ViewStream,Apps,Settings, AccountCircle} from '@material-ui/icons';
import { Typography ,AppBar,InputBase} from "@material-ui/core";
const App = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  const [selectNoteIndex, setNoteIndex] = useState(null);
  const [selectNote, setSelectNote] = useState(null);
  const [note, setNote] = useState(null);
  const [listVew,setListView] = useState(true);
  const collection = "notes";
  useEffect(() => {
    firebase
      .firestore()
      .collection(collection)
      .onSnapshot((serverUpdate) => {
        //every time a connection is updated a snapshot of the current state in the database is obtained and the corresponding ids of the documents are being tracked
        const notes = serverUpdate.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        // console.log(notes);
        setNote(notes);
      });
    // console.log(note);
  }, [collection]);

  function selectNotes(note, index) {
    setNoteIndex(index);
    setSelectNote(note);
    // console.log(selectNote);
    //when a note is selected , obtain its data and set the state
  }
  const newNote = async (title) => {
    const notes = { title: title, body: "" };
    const newFromDB = await firebase.firestore().collection("notes").add({
      title: notes.title,
      body: notes.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    const newId = newFromDB.id;
    await setNote([...note, notes]);
    const newNteINdex = note.indexOf(note.filter((nt) => nt.id == newId)[0]);
    setNoteIndex(newNteINdex);
    setSelectNote(note[newNteINdex]);
  };

  const deleteNotes = async (not) => {
    await setNote(note.filter((n) => not != n));
    const delIndex = note.indexOf(not);
    if (delIndex == selectNoteIndex) {
      setSelectNote(null);
      setNoteIndex(null);
    } else {
      if (note.length > 1) {
        selectNotes(note[selectNoteIndex - 1], selectNoteIndex - 1);
      } else {
        setSelectNote(null);
        setNoteIndex(null);
      }

      // note.length > 1
      //   ? selectNotes(note[selectNoteIndex - 1], selectNoteIndex - 1)
      //   : (setSelectNote(null)
      //   setNoteIndex(null)
      //   )
      //      setNoteIndex(null);}
    }
    firebase.firestore().collection("notes").doc(not.id).delete();
  };
  function noteUpdate(index, noteObj) {
    console.log(index);
    firebase.firestore().collection("notes").doc(index).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  // const deleteNotes = () => {};
  return (

    <div className="app-container App">
      
    <AppBar className={styles.containerBar}>
    <Menu className={styles.hamburger}/>
    <img src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt="KeepIcon" className={styles.image}/>
    <Typography color="textSecondary" className={styles.heading}>Keep</Typography>

    <div className={styles.search}>
            {/* <div > */}
              <Search className={styles.searchIcon}/>
            {/* </div> */}
            <InputBase
              placeholder="Search…"
              // classes={{
              //   root: styles.inputRoot,
              //   input: styles.inputInput,
              // }}
              className={styles.input}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
    <Refresh className={styles.refresh}/>
    {listVew ? <ViewStream className={styles.view} onClick={()=>{setListView(false)}}/> : <App/>}
    <Settings className={styles.setting}/>
    <Apps className={styles.apps}/>
    <AccountCircle className={styles.account}/>
    </AppBar>
      <div className={styles.contents}>

      
      {selectNote ? (
        <Editor
          selectedNote={selectNote}
          selectNoteIndex={selectNoteIndex}
          note={note}
          noteUpdate={noteUpdate}
        />
      ) : null}
      <BottomBar
        selectNoteIndex={selectNoteIndex}
        note={note}
        selectNotes={selectNotes}
        deleteNotes={deleteNotes}
        newNote={newNote}
      />
    </div>
    </div>
  );
  
};

export default App;

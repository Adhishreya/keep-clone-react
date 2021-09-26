import "./styles.css";
import { useState, useEffect, useMemo, useRef } from "react";
import { projectFirestore } from "./firebase/config.js";
import Editor from "./editor/Editor.js";
import BottomBar from "./bottomBar/BottomBar.js";
import firebase from "firebase";
import styles from './App.module.css';
import { useTheme } from '@material-ui/styles';
import {Menu,Search,Refresh,ViewStream,Apps,Settings, AccountCircle,Brightness4,Brightness7} from '@material-ui/icons';
import { Typography ,AppBar,InputBase} from "@material-ui/core";
const App = ({handler}) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  const [selectNoteIndex, setNoteIndex] = useState(null);
  const [selectNote, setSelectNote] = useState(null);
  const [note, setNote] = useState(null);
  const [listVew,setListView] = useState(true);
  const [lights,setLight] = useState(true);
  const [searchResult,setSearchResult] = useState([]);
  const [searchValue,setSearchValue] = useState("");
  const [mobile,setMobile] = useState(false);
  const searchRef = useRef(null);
  const collection = "notes";
  const theme = useTheme();
  // console.log(theme)
  useEffect(()=>{
    if(note!=null&&searchValue!=null)
  {  const results = note.filter((e,i)=>{
        return e.title.toLowerCase().includes(searchValue.toLowerCase())|| e.body.toLowerCase().includes(searchValue.toLowerCase());
    });

    setSearchResult(results);
    // console.log(searchResult)
  }
  },[searchValue])
  useEffect(() => {
    // console.log(selectNote)
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
        setNote(notes);
      });
  }, [collection]);

  function selectNotes(note, index) {
    setNoteIndex(index);
    setSelectNote(note);
    //select the note position from a list of notes and also store/obtain the note object.
  }


  const newNote = async (title,body) => {
    //initially store the document even if the body is empty
    if(title==""||title==null)
    {title = "Untitled";}
    if(body==""||body==null)
    body="";
    const notes = { title: title, body: body };
    const newFromDB = await firebase.firestore().collection("notes").add({
      title: notes.title,
      body: notes.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    //get the id of the newly added note
    const newId = newFromDB.id;
    // obtain the newly added note and add to the current state
     setNote([...note, notes]);
    setNoteIndex(null);
    setSelectNote({body:null,title:null,id:null});
  };

  const deleteNotes = async (not) => {
    // await
    const delIndex = note.indexOf(not);
     setNote(note.filter((n) => not != n));//altering the note value by removing the passed note object from the list
     if(searchResult)
     setSearchResult(searchResult.filter((n) => not != n))

    if (delIndex === selectNoteIndex) {
     
      setSelectNote({body:null,title:null,id:null});
      setNoteIndex(null);
      setSearchResult(null);
      refresh();
      // 
    } else {
      if (note.length > 1) {
      //   selectNotes(note[selectNoteIndex - 1], selectNoteIndex - 1);
      // } else {
        setSelectNote({body:null,title:null,id:null});
        setSearchResult(null);
        setNoteIndex(null);
        refresh();
      }

      // note.length > 1
      //   ? selectNotes(note[selectNoteIndex - 1], selectNoteIndex - 1)
      //   : (setSelectNote(null)
      //   setNoteIndex(null)
      //   )
      //      setNoteIndex(null);}
    }
    // console.log(selectNoteIndex)
  await firebase.firestore().collection("notes").doc(not.id).delete();
    refresh();
  };
  function noteUpdate(index, noteObj) {
    // console.log(index);
    if(noteObj.title==""||noteObj.title==null)
    {noteObj.title = "Untitled";}
    if(noteObj.body==""||noteObj.body==null)
    noteObj.body="";
    firebase.firestore().collection("notes").doc(index).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
      //update the note by obtaining the title and the corresponding body of the note from the user and updating the timetamp 
    });
    setSelectNote({body:null,title:null,id:null});
        setNoteIndex(null);
  }
  // useEffect(()=>{
  //   console.log(localStorage.getItem('theme'))
  //   if(localStorage.getItem('theme')=='true')
  //   {
  //     setDisplay(true);
  //   }

  //   else
  //   setDisplay(false)
  // },[localStorage.getItem('theme')]);
  const viewStyle = () =>{
    if(listVew)
    localStorage.setItem('list',true)
    else
    localStorage.setItem('list',false)
  }
  const viewTheme = () =>{
    // console.log((localStorage.getItem('theme')));
    if(lights)
    localStorage.setItem('theme','light')
    else
    localStorage.setItem('theme','dark')

    handler();
  }

  const refresh = () =>{
    //clear all the currently cached data
    setListView(true)
    localStorage.removeItem('list');
    localStorage.removeItem('theme');
    searchRef.current.value=""
    setSelectNote({body:null,title:null,id:null});
    setNoteIndex(null);
    setSearchValue(null);
    setSearchResult(null);
  }
  return (
// style = {{background:theme.palette.primary.main}}
      <div className={styles.MainContainer} style = {{background:theme.palette.primary.main}}>
      <AppBar className={styles.containerBar} >
          <div className={styles.containerMain}>

              <img src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt="KeepIcon" className={styles.image}/>
       <div className={styles.search}>
                  <Search className={styles.searchIcon} />
                  <input
                  type="text"
                  placeholder="Search…"
                  ref={searchRef}
                  style={{width:"80%",height:"2rem",border:"none"}}
                  value = {null}
                  onChange={e=>setSearchValue(e.target.value)}
                  className={styles.input}
                  />
              </div>

              <div className={(mobile) ? styles.clickView : styles.rightFloat} style = {{background:theme.palette.primary.main}}>
              <Refresh className={styles.refresh} onClick={()=>refresh()}/>
            {(listVew? <ViewStream className={styles.view} onClick={()=>{setListView(false);viewStyle();}}/>:<Apps className={styles.view} onClick={()=>{setListView(true);viewStyle()}}/>)}
              {/* <Settings className={styles.setting}/> */}
              {lights?<Brightness4 onClick={()=>{setLight(false);viewTheme();}}/>:<Brightness7  onClick={()=>{setLight(true);viewTheme();}}/>}
              {/* <Apps className={styles.apps}/> */}
              <AccountCircle className={styles.account}/>
              </div>
              <Menu className={styles.hamburger} onClick={()=>{setMobile(mobile=>!mobile);console.log(mobile)}}/>
          </div>
      </AppBar>
    
        <div className={styles.contentsMain}>
            
        <Editor
                selectedNote={selectNote?selectNote:{id:null}}//passing the select note object
                selectNoteIndex={selectNoteIndex}
                note={note}
                selectNotes={selectNotes}
                newNote={newNote}
                noteUpdate={noteUpdate}//passing the note update function to child component
        />
        <BottomBar
          selectNoteIndex={selectNoteIndex}
          note={searchValue?searchResult:note}
          selectNotes={selectNotes}
          deleteNotes={deleteNotes}
          listVew={listVew}
        />
      </div>
    </div>
  );
  
};

export default App;

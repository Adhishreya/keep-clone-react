import { useState, useEffect, useRef } from "react";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import { Button, List, Grid } from "@material-ui/core";
const Editor = ({
  classes,
  selectedNote,
  selectNoteIndex,
  note,
  selectNotes,
  newNote,
  noteUpdate
}) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");
  const inputReference = useRef(null);
  const bodyReference = useRef(null);
  const [save,setSave] = useState(true);

  useEffect(()=>{
    // console.log(selectedNote)
    if(selectNoteIndex !=null)
    {
      inputReference.current.value=selectedNote.title;
      bodyReference.current.value=selectedNote.body;
      setSave(false); 
    }
  },[selectNoteIndex])

  useEffect(() => {
 //update the component with the contents of the selected note object
    setTitle(selectedNote.title);
    setText(selectedNote.body);
    if(selectedNote.id)
    setId(selectedNote.id);
  }, [selectedNote.id]);


  const updateBody = (val) => {
    async function change(vals) {
      // await 
      setText(vals);
      c_update();
    }
    change(val);
    //asynchronously keep updating state
  };
  //continuouly wait for user to stop typing for few seconds and immediately launch a http request to the firebase tore to save the text

  const updateTitle = (e) => {
    async function change(e) {
      setTitle(e.target.value);
      c_update();
    }
    change(e);
    //asynchronously keep updating state
  };
  //continuouly wait for user to stop typing for few seconds and immediately launch a http request to the firebase tore to save the text
  const submitNote = () =>
  {
    // if(title!="" || body != ""||body==null||title==null)
    // { 
      // console.lo
      inputReference.current.value="";
      bodyReference.current.value="";
      if(title==""||title==null)
      {setTitle("Untitled");}

      if(body==""||body==null)
    {setBody("");}
      newNote(title,body);
      console.log(inputReference.current);
      setTitle(inputReference.current.value);
      setBody(inputReference.current.value);
      // setSave(false);
      // selectNotes(null,null);
      // selectNoteIndex(null);
      // setselectedNote(null)
    // }
  }
useEffect (()=>{
//   if(title=="" || body == "")
//  { newNote(title,body)}
},[title,body]);
  var c_update = debounce(() => {

    noteUpdate(selectedNote.id, { title: title, body: text });
  }, 1500);
  return ( 
    <div className={classes.editorContainer}>

<div className={classes.inputComponent}>
        <input ref={inputReference} value={null} className={classes.inputTitleComponent} onChange={(e)=>setTitle(e.target.value)} placeholder="title" type="text"/>
        <textarea ref={bodyReference} value={null} className={classes.inputNoteComponent} onChange={(e)=>setBody(e.target.value)} placeholder="Take a note ...."/>
      </div>
      <Button onClick={()=>{
        // console.log(save)
        if(save)
        {submitNote()}
        else
        {
          noteUpdate(selectedNote.id,{title:title,body:body});
          inputReference.current.value="";
          bodyReference.current.value="";
          setSave(true);
        }
        }}>Save Note</Button>
      {/* <div className={classes.inputComponent}>
        <input  className={classes.inputTitleComponent}   onChange={(e) =>   updateTitle(e)} value={title ? title : ""} placeholder="title" type="text"/>
        <textarea className={classes.inputNoteComponent} placeholder="Take a note ...." value={text} onChange={updateBody}  className={classes.inputArea}/>
      </div> */}

      {/* <input
        type="text"
        style={{ color: "black" }}
        placeholder="Note title...."
        value={title ? title : ""}
        onChange={(e) =>   updateTitle(e)}
      /> */}
     
     
      
      {/* <DeleteIcon /> */}
    </div>
  );
};
// export default Editor;
export default withStyles(styles)(Editor);
//styles is function defined in styles.js...comprises of bunch of classes

//https://youtu.be/I250xdtUvy8?t=1485
//matertial ui styling can be done later

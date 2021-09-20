import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
const Editor = ({
  classes,
  selectedNote,
  selectNoteIndex,
  note,
  noteUpdate
}) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");


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

  var c_update = debounce(() => {

    noteUpdate(selectedNote.id, { title: title, body: text });
  }, 1500);
  return ( 
    <div className={classes.editorContainer}>

<div className={classes.inputComponent}>
        <input  className={classes.inputTitleComponent} placeholder="title" type="text"/>
        <textarea className={classes.inputNoteComponent} placeholder="Take a note ...."/>
      </div>

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
     
      {/* <ReactQuill value={text} onChange={updateBody}  className={classes.inputArea} placeholder="Take a note..."/> */}
      
      {/* <DeleteIcon /> */}
    </div>
  );
};
// export default Editor;
export default withStyles(styles)(Editor);
//styles is function defined in styles.js...comprises of bunch of classes

//https://youtu.be/I250xdtUvy8?t=1485
//matertial ui styling can be done later

import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import DeleteIcon from "@material-ui/icons/Delete";
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

  // useEffect(()=>{
  // // update()
  // },[text])
  // console.log(selectedNote);
  useEffect(() => {
    // console.log(selectedNote);
    setTitle(selectedNote.title);
    setText(selectedNote.body);
    setId(selectedNote.id);
  }, [selectedNote.id]);
  const update = (val) => {
    async function change(vals) {
      await setText(vals);
      c_update();
    }
    change(val);
    //asynchronously keep updating state
  };
  //continuouly wait for user to stop typing for few seconds and immediately launch a http request to the firebase tore to save the text

  var c_update = debounce(() => {
    // console.log("updating");

    noteUpdate(selectedNote.id, { title: title, body: text });
  }, 1500);
  return (
    <div className={classes.editorContainer}>
      <ReactQuill value={text} onChange={update} />
      {/* <DeleteIcon /> */}
    </div>
  );
};
// export default Editor;
export default withStyles(styles)(Editor);
//styles is function defined in styles.js...comprises of bunch of classes

//https://youtu.be/I250xdtUvy8?t=1485
//matertial ui styling can be done later

import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
// import { withStyles } from "@material-ui/core/styles";
const Editor = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const update = async (val) => {
    await setText(val);
    //asynchronously keep updating state
    c_update();
  };
  //continuouly wait for user to stop typing for few seconds and immediately launch a http request to the firebase tore to save the text

  var c_update = debounce(() => {
    console.log("updating");
  }, 1500);
  return (
    <div>
      <ReactQuill value={text} onChange={update} />
    </div>
  );
};
export default Editor;
//https://youtu.be/I250xdtUvy8?t=1485
//matertial ui styling can be done later

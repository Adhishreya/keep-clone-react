import { useState, useEffect, useRef } from "react";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const Editor = ({
  classes,
  selectedNote,
  selectNoteIndex,
  note,
  selectNotes,
  newNote,
  noteUpdate
}) => {
  const [text, setText] = useState(null);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [id, setId] = useState(null);
  const inputReference = useRef(null);
  const bodyReference = useRef(null);
  const [save,setSave] = useState(true);

  useEffect(()=>{
    console.log("selected note "+selectedNote+"   selected index "+selectNoteIndex+" in both monitoring" );
    if(selectNoteIndex !=null)
    {
      inputReference.current.value=selectedNote.title;
      bodyReference.current.value=selectedNote.body;
      setSave(false); 
    }
    else
    {
      inputReference.current.value=null;
      bodyReference.current.value=null;
      setSave(true); 
    }
  },[selectNoteIndex,selectedNote]);

  useEffect(() => {
 //update the component with the contents of the selected note object
 if(selectedNote.id)
{    setTitle(selectedNote.title);
    setBody(selectedNote.body);
  
    setId(selectedNote.id);
  
}
else
setSave(false); 
  }, [selectedNote.id]);


  const updateBody = (val) => {
    async function change(vals) {
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

      inputReference.current.value="";
      bodyReference.current.value="";
      if(title==""||title==null)
      {setTitle("Untitled");}

      if(body==""||body==null)
    {setBody("");}
      newNote(title,body);
      // console.log(inputReference.current);
      setTitle(inputReference.current.value);
      setBody(inputReference.current.value);
    
  }

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
        if(selectedNote.id==null)
        {
          console.log("saving");
          submitNote()
        }
        else
        {
          if(selectNoteIndex !=null)
          {console.log("updating"+selectedNote);
              if(title==""||title==null)
              {setTitle("Untitled");}

              if(body==""||body==null)
              {setBody("");}
            noteUpdate(selectedNote.id,{title:title,body:body});
        }
          inputReference.current.value="";
          bodyReference.current.value="";      
      // console.log(inputReference.current);
      setTitle(inputReference.current.value);
      setBody(inputReference.current.value);
          setSave(true);
        }
        }}>Save Note</Button>
 
    </div>
  );
};
export default withStyles(styles)(Editor);

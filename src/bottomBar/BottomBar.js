import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import { Button, List } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import BottomBarItem from "../bottomBarItem/BottomBarItem.js";
const BottomBar = ({
  note,
  classes,
  selectNoteIndex,
  selectNotes,
  deleteNotes,
  newNote
}) => {
  const [addnote, setAddNote] = useState(false);
  const [title, setTitle] = useState(null);
  // const { note, selectNoteIndex } = this.props;
  // classes
  const btnClick = (e) => {
    console.log("new btn clicked");
    setAddNote(!addnote);
  };
  const updateFile = (e) => {
    // console.log("update file");
    setTitle(e.target.value);
    console.log(title);
  };
  const submitNote = () => {
    // console.log("submit file");
    newNote(title);
    setTitle("");
    setAddNote(false);
  };
  const selectNote = (note, index) => {
    // console.log("select note");
    selectNotes(note, index);
    // console.log(note, index);
  };
  const deleteNote = (note) => {
    // console.log("delete note");
    deleteNotes(note);
  };
  return (
    <div>
      {note ? (
        <div className={classes.sidebarContainer}>
          <Button className={classes.newNoteBtn} onClick={(e) => btnClick(e)}>
            {addnote ? "Cancel" : "New Note"}
          </Button>
          {addnote ? (
            <div>
              <input
                type="text"
                placeholder="enter title"
                onKeyUp={(e) => updateFile(e)}
              />
              <Button onClick={submitNote}>Submit Note</Button>
            </div>
          ) : null}

          <List>
            {note.map((n, index) => {
              return (
                <div key={index}>
                  <BottomBarItem
                    note={n}
                    index={index}
                    selectNoteIndex={selectNoteIndex}
                    selectNote={selectNote}
                    deleteNote={deleteNote}
                  />
                </div>
              );
            })}
          </List>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
// export default BottomBar;
export default withStyles(styles)(BottomBar);

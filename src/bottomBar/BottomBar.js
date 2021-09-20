import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import { Button, List, Grid } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import BottomBarItem from "../bottomBarItem/BottomBarItem.js";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    display: "grid",
    overflow:" hidden",
    width: "80%",
    margin: "auto",
    /* flex-wrap: wrap; */
    /* justify-content: space-around; */
    // backgroundColor: "#fff",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gridGap: "2rem",
    // flexWrap: "wrap",
    // justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    // width: 500,
    width: "100%",
    height: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

const BottomBar = ({
  note,
  // classes,
  selectNoteIndex,
  selectNotes,
  deleteNotes,
  newNote
}) => {
  const classes = useStyles();

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
    // console.log(title);
  };
  const submitNote = () => {
    //pass the title of the new note to the app.js component nd set the current title to null 
    newNote(title);
    setTitle("");
    setAddNote(false);
  };
  const selectNote = (note, index) => {
    selectNotes(note, index);
  };
  const deleteNote = (note) => {
    deleteNotes(note);
  };
  return (
    <div className={classes.bottomBarComponent}>
      {note ? (
        <div className={classes.barComponentMain}>
          <div className={classes.root}>
              {
              note.map((n, index) => {
              return (
                      <div
                      key={index}
                      className={classes.gridList}
                      >
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
          </div>
          {/* classes.sidebarContainer */}

{/* 
          <Button className={classes.newNoteBtn} onClick={(e) => btnClick(e)}>
            {addnote ? "Cancel" : "New Note"}
          </Button> */}


          {/* {addnote ? ( */}
            
               {/* <input class="ql-editor" data-gramm="false" contenteditable="true" onKeyUp={(e) => updateFile(e)} placeholder="title"/> */}
              {/* <input
                type="text"
                placeholder="enter title"
                onKeyUp={(e) => updateFile(e)}
              /> */}
              {/* <Button onClick={submitNote}>Submit Note</Button> */}
            
          {/* ) : null} */}

          
        </div>
      ) : (
        null
      )}
    </div>
  );
};
// export default BottomBar;
export default withStyles(styles)(BottomBar);

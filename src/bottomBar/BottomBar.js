import { useState, useEffect } from "react";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import { Button, List, Grid } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import BottomBarItem from "../bottomBarItem/BottomBarItem.js";

const useStyles = makeStyles((theme) => ({
  
  gridViewStyle: {
    display: "grid",
    overflow:" hidden",
    width: "80%",
    margin: "auto",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gridGap: "2rem",
    overflow: "hidden",
    
    backgroundColor: theme.palette.background.paper
  },
  listViewStyle:{

    display: "flex",
    overflow:" hidden",
    width: "80%",
    margin: "auto",
    
    flexDirection:"column",
    justifyContent:"center",

    overflow: "hidden",
  },
  gridList: {
    width: "100%",
    height: "100%",
    borderRadius:"1rem"
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
  listVew,
  newNote
}) => {
  const classes = useStyles();

  const [addnote, setAddNote] = useState(false);
  const [title, setTitle] = useState(null);
  const [display,setDisplay] = useState(false);

  useEffect(()=>{
    // console.log(localStorage.getItem('list'))
    if(localStorage.getItem('list')=='true')
    {
      setDisplay(true);
    }

    else
    setDisplay(false)
  },[localStorage.getItem('list')]);
  const btnClick = (e) => {
    // console.log("new btn clicked");
    setAddNote(!addnote);
  };
  // const updateFile = (e) => {
  //   setTitle(e.target.value);
  // };
  // const submitNote = () => {
  //   //pass the title of the new note to the app.js component nd set the current title to null 
  //   newNote(title);
  //   setTitle("");
  //   setAddNote(false);
  // };
  const selectNote = (note, index) => {
    selectNotes(note, index);
  };
  const deleteNote = (note) => {
    deleteNotes(note);
  };
  useEffect(()=>{
    console.log(note)
  },[note])
  return (
    <div className={classes.bottomBarComponent}>
      {note ? (
        <div className={classes.barComponentMain}>
          <div className={display ? classes.listViewStyle:classes.gridViewStyle}>
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
       
        </div>
      ) : (
        null
      )}
    </div>
  );
};
export default withStyles(styles)(BottomBar);

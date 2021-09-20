import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import { removeHTMLTags } from "../helper/debounce.js";
import IconButton from "@material-ui/core/IconButton";
import {
  Button,
  ListItem,
  ListItemText,
  GridListTile,
  GridList,
  GridListTileBar
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { withStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: "fit - content"
  }
}));
const BottomBarItem = ({
  note,
  index,
  selectNoteIndex,
  selectNote,
  deleteNote
}) => {
  const classes = useStyles();

  return (
    <div key={index}>
      <GridList 
        className={classes.gridList} 
        selected={selectNoteIndex === index}
        alignItems="flex-start"
      >
        {console.log(removeHTMLTags(note.body))}
        {/* <div onClick={() => selectNote(note, index)}> */}
        {/* <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 10) + "....")}
            // secondary={note.body}
          ></ListItemText>
        </div>
        <Delete
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete this note? ${note.title}`
              )
            )
              deleteNote(note, index);
          }}
        ></Delete> */}

        <GridListTile
          key={note.title}
          onClick={() => selectNote(note, index)}
          cols={2}
          className={classes.titleStyle}
          // style={{ height: "auto" }}
        >
          
          {/* cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}> */}
          {/* <img src={tile.img} alt={tile.title} /> */}
          {/* <div>{note.body}</div> */}
          <div
            // primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 10) + "....")}
            // secondary={note.body}
          ></div>
          <GridListTileBar
           
            title={note.title}
            titlePosition="top"
            cols={2}

            actionIcon={
              <IconButton
                aria-label={`star ${note.title}`}
                className={classes.icon}
              >
                <Delete
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete this note? ${note.title}`
                      )
                    )
                      deleteNote(note, index);
                  }}
                ></Delete>
              </IconButton>
            }
            actionPosition="left"
            className={classes.titleBar}
          />
        </GridListTile>
      </GridList>
    </div>
  );
};
// export default BottomBarItem;
export default withStyles(styles)(BottomBarItem);

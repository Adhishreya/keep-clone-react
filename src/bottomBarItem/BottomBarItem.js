import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import removeHTMLTags from "../helper/debounce.js";
import { Button, ListItem, ListItemText } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
const BottomBarItem = ({
  note,
  index,
  selectNoteIndex,
  selectNote,
  deleteNote
}) => {
  return (
    <div key={index}>
      <ListItem selected={selectNoteIndex === index} alignItems="flex-start">
        <div onClick={() => selectNote(note, index)}>
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 10) + "....")}
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
        ></Delete>
      </ListItem>
    </div>
  );
};
// export default BottomBarItem;
export default withStyles(styles)(BottomBarItem);

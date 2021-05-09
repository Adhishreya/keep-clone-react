import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const BottomBar = ({ note, classes, selectNoteIndex }) => {
  const [addnote, setAddNote] = useState(false);
  const [title, seTitle] = useState(null);
  // const { note, selectNoteIndex } = this.props;
  // classes
  const btnClick = (e) => {};
  return (
    <div className={classes.sidebarContainer}>
      <Button className={classes.newNoteBtn} onClick={() => btnClick}>
        Button
      </Button>
    </div>
  );
};
// export default BottomBar;
export default withStyles(styles)(BottomBar);

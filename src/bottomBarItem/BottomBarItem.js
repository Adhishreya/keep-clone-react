import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper/debounce.js";
import styles from "./styles.js";
import { withStyles } from "@material-ui/core/styles";
const BottomBarItem = () => {
  return <div>BottomBarItem</div>;
};
// export default BottomBarItem;
export default withStyles(styles)(BottomBarItem);

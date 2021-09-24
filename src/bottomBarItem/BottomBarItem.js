import React,{ useState, useEffect } from "react";
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
import { dark, light } from "@material-ui/core/styles/createPalette";




const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    overflow:" hidden",
    height:"4rem !important",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gridGap: "1rem",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "fit - content",
    height: "fit - content"
  }
}));
var gridStyle =
{
    overflow:" hidden",
    height:"4rem",
    // color:"black",
    borderRadius:"0.5rem",
    // backgroundColor: "white",
    border:"2px solid #fff"
}
var titleStyl=
{
  // color:"black",
    borderRadius:"0.5rem",
    // backgroundColor: "white"
}
const BottomBarItem = ({
  note,
  index,
  selectNoteIndex,
  selectNote,
  deleteNote
}) => {
  const classes = useStyles(dark);

  return (
    <div key={index} className={classes.bottomBarItemComponent}>
      <GridList 
       style={gridStyle}       
        onClick={() =>{ selectNote(note, index);
          // console.log(index)
        }}
        className={classes.gridListMain} 
        selected={selectNoteIndex === index}
      >
        <GridListTile
         style={gridStyle}
          key={note.title}
          onClick={() => selectNote(note, index)}
          cols={2}
          className={classes.titleStyle}
          // style={{ height: "auto" }}
        >
          
          {/* cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}> */}
          {/* <img src={tile.img} alt={tile.title} /> */}
          {/* <div>{note.body}</div> */}
         
          <GridListTileBar
           style={gridStyle}
            title={note.title}
            titlePosition="top"
            cols={2}
            style={{height:"2rem"}}
            className={classes.titleGridBar}

            actionIcon={
              <IconButton
                aria-label={`star ${note.title}`}
                className={classes.icon}
              >
                <Delete
                  onClick={() => {
                    // if (
                    //   window.confirm(
                    //     `Are you sure you want to delete this note? ${note.title}`
                    //   )
                    // )
                    // console.log("deleting"+ index)
                    // selectNote(note, index)
                      deleteNote(note);
                  }}
                ></Delete>
              </IconButton>
            }
            actionPosition="left"
            className={classes.titleBar}
          />
        </GridListTile>
      </GridList>
      <div>
        {removeHTMLTags(note.body.substring(0, 20) + "....")}
      </div>
    </div>
  );
};
// export default BottomBarItem;
export default withStyles(styles)(BottomBarItem);

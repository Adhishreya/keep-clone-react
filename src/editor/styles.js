const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black"
  },
  titleInput: {
    height: "50px",
    boxSizing: "border-box",
    border: "none",
    padding: "5px",
    fontSize: "24px",
    width: "calc(100% - 300px)",
    backgroundColor: "#29487d",
    color: "white",
    paddingLeft: "50px"
  },
  editIcon: {
    position: "absolute",
    left: "310px",
    top: "12px",
    color: "white",
    width: "10",
    height: "10"
  },
  editorContainer: {
    height: "100%",
    display:"flex",
    flexDirection:"row", 
    boxSizing: "border-box",
    position: "relative",
    // top: "5rem"
  },
  inputArea:{
    // background:'rgb(225,0,0)',
    // display:'grid',
    display :'flex',
    flexDirection:'column-reverse'

    // gridTemplateColumns: '1fr 3fr'
  

  },
  // inputComponent:
  // {
  //   background:"red",
  //   width:"300px"
  // }

inputComponent:
{
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    /* align-items: center, */
    /* justify-content: center, */
    height: "fit-content",
    backgroundColor: "antiquewhite",
    width: "80%",
    border: "2px solid rgb(168, 158, 156)"
},
// input:{
//     border: none,
// },
inputNoteComponent:{height: "3rem", scrollBehavior: "smooth",overflowX: "hidden",border: "none"},
inputTitleComponent:{height: "2rem",fontWeight: "700",border: "none"}
});

export default styles;

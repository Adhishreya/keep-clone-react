const styles = (theme) => ({
  listItem: {
    cursor: "pointer"
  },
  textSection: {
    maxWidth: "85%"
  },
  deleteIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red"
    }
  },
  titleStyle:{
    background:'red'
  },
  bottomBarItemComponent:{
    position:"absolute",
    top:"10rem"

  },
  titleGridBar:
  {
    width: "50%",
    margin: "auto"
  }

});

export default styles;

// import React,{useEffect} from 'react';
// import { ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';
// import { amber, deepOrange, grey } from '@material-ui/core/colors';
// import App from './App'
// const getDesignTokens = (mode) => ({
//   palette: {
//     mode,
//     primary: {
//       ...amber,
//       ...(mode === 'dark' && {
//         main: amber[300],
//       }),
//     },
//     ...(mode === 'dark' && {
//       background: {
//         default: grey[800],
//         paper: grey[800],
//       },
//     }),
//     text: {
//       ...(mode === 'light'
//         ? {
//             primary: grey[900],
//             secondary: grey[800],
//           }
//         : {
//             primary: '#fff',
//             secondary: grey[500],
//           }),
//     },
//   },
// });
// // function MyApp() {
// //   const theme = useTheme();
// //   return (
// //     <Box
// //       sx={{
// //         display: 'flex',
// //         width: '100%',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         bgcolor: 'background.default',
// //         color: 'text.primary',
// //         borderRadius: 1,
// //         p: 3,
// //       }}
// //     >
// //       This is a {theme.palette.mode} mode theme with custom palette
// //     </Box>
// //   );
// // }

// const handler


// export default function Main() {
//   const darkModeTheme = createMuiTheme(getDesignTokens('dark'));
//   useEffect(()=>{
//     console.log((localStorage.getItem('theme')=='light'));
//     createMuiTheme(getDesignTokens((localStorage.getItem('theme'))));
//   },[localStorage.getItem('theme')])
//   return (
//     <ThemeProvider theme={darkModeTheme}>
//       <App {handler}/>
//     </ThemeProvider>
//   );
// }

import {createMuiTheme ,ThemeProvider } from "@material-ui/core/styles";
import {  grey } from '@material-ui/core/colors';
import { useState } from "react"
import App from "./App"


const Main = () =>{
  const [theme,setTheme] = useState(localStorage.getItem('theme')=="light");
  const palleteType = theme ? "dark" : "light";
  const primaryColor = theme ? grey[900] : grey[50];
  const secondaryColor = theme ? grey[800] : grey[100];
  const primaryTextColor = theme ? grey[50] : grey[900];
  const secondaryTextColor = theme ? grey[100] : grey[800];

  const darkTheme = createMuiTheme({
    palette :
    {
      type : palleteType,
      primary:
      {
        main:primaryColor
      },
      secondary : 
      {
        main : secondaryColor
      }
    },
    text:
    {
      primaryColor : primaryTextColor,
      secondaryColor : secondaryTextColor
    }
  })
  const handler = () =>{
      if(localStorage.getItem('theme')=="light")
      setTheme(false);
      else
      setTheme(true);
  }
  return(<ThemeProvider theme={darkTheme}>
    <App handler={handler}/>
  </ThemeProvider>)
}
export default Main;
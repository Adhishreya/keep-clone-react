import * as React from 'react';
import { ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';
import { amber, deepOrange, grey } from '@material-ui/core/colors';
import App from './App'
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: amber[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: deepOrange[900],
        paper: deepOrange[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});

// function MyApp() {
//   const theme = useTheme();
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         bgcolor: 'background.default',
//         color: 'text.primary',
//         borderRadius: 1,
//         p: 3,
//       }}
//     >
//       This is a {theme.palette.mode} mode theme with custom palette
//     </Box>
//   );
// }



export default function Main() {
  const darkModeTheme = createMuiTheme(getDesignTokens((localStorage.getItem('theme'))));
  React.useEffect(()=>{
    console.log((localStorage.getItem('theme')=='light'));
    createMuiTheme(getDesignTokens((localStorage.getItem('theme'))));
  },[localStorage.getItem('theme')])
  return (
    <ThemeProvider theme={darkModeTheme}>
      <App/>
    </ThemeProvider>
  );
}

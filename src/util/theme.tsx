import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
        main: '#3f50b5',
      },
      secondary: {
        main: '#f44336',
      },
  },
});

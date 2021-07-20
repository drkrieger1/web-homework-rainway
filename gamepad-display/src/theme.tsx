import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen.A700,
    },
    secondary: {
      main: red.A400,
    },
    type: 'dark',
  },
});

export default theme;
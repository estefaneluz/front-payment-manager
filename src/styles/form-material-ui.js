import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  input: {
    width: '100%',
    '& .MuiInput-underline:after': {
      borderBottomColor: '#4C4C4C',
    },
    '& label.Mui-focused': {
      color: '#374952',
      fontWeight: '600',
      fontSize: '18px'
    },
  }
});



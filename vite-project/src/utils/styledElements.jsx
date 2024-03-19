import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { styled } from '@mui/system';

export const MyTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#4ee47b', 
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4ee47b', 
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgb(24, 24, 27)',
    },
    '&:hover fieldset': {
      borderColor: '#5cb879', 
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4ee47b', 
    },
  },
});

export const MyFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#4ee47b', 
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4ee47b', 
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgb(24, 24, 27)',
    },
    '&:hover fieldset': {
      borderColor: '#5cb879', 
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4ee47b', 
    },
  },
});

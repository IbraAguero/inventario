import { Dialog, styled } from '@mui/material';
import { tokens } from '../../theme';

export const StyledDialog = styled(Dialog)(({ theme }) => {
  const colors = tokens(theme.palette.mode);

  return {
    '& .MuiPaper-root': {
      background: colors.primary[700], // Change to 'red' for example to make it more visible
    },
    '& .MuiBackdrop-root': {
      backdropFilter: 'blur(1px)', // Change to 'red' for example to make it more visible

      //backgroundColor: 'transparent', // Try to remove this to see the difference
    },
  };
});

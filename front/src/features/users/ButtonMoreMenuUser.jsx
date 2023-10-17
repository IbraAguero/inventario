import { IconButton, MenuItem } from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useConfirm } from 'material-ui-confirm';
import { StyledMenu } from '../../components/styledComponents/StyledMenu';

const ButtonMoreMenuUser = ({ id, name, state }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const confirm = useConfirm();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* const handleDelete = async () => {
    try {
      await confirm({
        description: `Los datos de ${name} se eliminará permanentemente.`,
      });
      await deleteAction(id);
    } catch (error) {
      console.log('Deletion cancelled.');
    }
  }; */

  return (
    <>
      <IconButton onClick={handleClick} variant="contained">
        <MoreVertIcon />
      </IconButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {state ? (
          <MenuItem onClick={() => console.log('dar de baja')}>
            <DoDisturbOnOutlinedIcon />
            Dar de baja
          </MenuItem>
        ) : (
          <MenuItem onClick={() => console.log('dar de baja')}>
            <CheckCircleOutlineOutlinedIcon />
            Dar de alta
          </MenuItem>
        )}
      </StyledMenu>
    </>
  );
};
export default ButtonMoreMenuUser;

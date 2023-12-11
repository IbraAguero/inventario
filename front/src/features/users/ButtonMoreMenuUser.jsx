import { IconButton, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useConfirm } from "material-ui-confirm";
import { StyledMenu } from "../../components/styledComponents/StyledMenu";
import { useUpdateUserMutation } from "./usersApiSlice";

const ButtonMoreMenuUser = ({ id, name, state }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const confirm = useConfirm();

  const [updateUser, { data, error, isLoading, isSuccess }] =
    useUpdateUserMutation();

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

  const seUserActive = async () => {
    try {
      console.log("dar de alta");
      console.log(id);
      await confirm({
        description: `El usario ${name} sera dado de alta.`,
      });
      await updateUser({ id, active: true });
    } catch (error) {
      console.log("Deletion cancelled.");
    } finally {
      handleClose();
    }
  };

  const seUserInactive = async () => {
    try {
      await confirm({
        description: `El usario ${name} sera dado de baja.`,
      });
      await updateUser({ id, active: false });
    } catch (error) {
      console.log("Deletion cancelled.");
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} variant="contained">
        <MoreVertIcon />
      </IconButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {state ? (
          <MenuItem onClick={seUserInactive}>
            <DoDisturbOnOutlinedIcon />
            Dar de baja
          </MenuItem>
        ) : (
          <MenuItem onClick={seUserActive}>
            <CheckCircleOutlineOutlinedIcon />
            Dar de alta
          </MenuItem>
        )}
      </StyledMenu>
    </>
  );
};
export default ButtonMoreMenuUser;

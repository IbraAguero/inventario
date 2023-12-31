import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import EditIcon from "@mui/icons-material/Edit";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
  useAddOptionMutation,
  useDeleteOptionMutation,
  useEditOptionMutation,
  useLazyGetOptionQuery,
} from "../../app/api/optionsApiSlice";
import { StyledDialog } from "../styledComponents/StyledDialog";
import { tokens } from "../../theme";
import { StyledMenu } from "../styledComponents/StyledMenu";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useConfirm } from "material-ui-confirm";

const MenuSelect = ({ url, name, label, disabled, valuesForm }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errContent, setErrorContent] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();

  const confirm = useConfirm();

  const { getValues, setValue: setValueForm } = useFormContext();

  const value = getValues(name);

  const [trigger] = useLazyGetOptionQuery();

  const { handleSubmit, control, reset, formState } = useForm({
    defaultValues: { ...valuesForm, name: "" },
  });

  const [addOption, { isSuccess, data: dataAdd, error }] =
    useAddOptionMutation();
  const [editOption, { isSuccess: isUpdSuccess, error: errorUpd }] =
    useEditOptionMutation();
  const [deleteOption] = useDeleteOptionMutation();

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    setModal(true);
    handleClose();
    setErrorContent("");
  };

  const closeModal = () => {
    setModal(false);
    reset();
  };

  const handleAddOption = () => {
    console.log("agregar");
    openModal();
    setIsEditing(false);
    reset({ ...valuesForm, name: "" });
  };

  const handleEditOption = async () => {
    console.log("editar");
    const { data } = await trigger(`${url}/${value}`);
    openModal();
    setIsEditing(true);
    reset({ ...valuesForm, name: data?.name || "" });
  };

  const handleDeleteOption = async () => {
    console.log("eliminar");
    const { data } = await trigger(`${url}/${value}`);
    try {
      await confirm({
        description: `El ${label} ${data?.name} se eliminará permanentemente.`,
      });
      const { error: errorDel } = await deleteOption({ url, id: data.id });
      if (!errorDel) {
        setValueForm(name, "");
        handleClose();
      } else {
        enqueueSnackbar(errorDel?.data?.message, {
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error || errorUpd) {
      enqueueSnackbar(error?.data?.message || errorUpd?.data?.message, {
        variant: "error",
      });
    }
  }, [error, errorUpd]);

  const onSubmit = handleSubmit(async (values) => {
    if (isEditing) {
      await editOption({
        url,
        id: value,
        data: values,
      });
    } else {
      await addOption({ url, data: values });
    }
  });

  useEffect(() => {
    if (isSuccess || isUpdSuccess) {
      closeModal();
      if (isSuccess) {
        const id = dataAdd.id;
        setValueForm(name, id);
      } else {
        setValueForm(name, value);
      }
    }
  }, [isSuccess, isUpdSuccess]);

  return (
    <>
      <IconButton
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
        disabled={disabled}
      >
        <AddIcon />
      </IconButton>
      <StyledMenu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
        <MenuItem onClick={handleAddOption} key="add" disableRipple>
          <LibraryAddIcon />
          Agregar
        </MenuItem>
        {value && [
          <MenuItem onClick={handleEditOption} disableRipple key="edit">
            <EditIcon />
            Editar
          </MenuItem>,
          <MenuItem onClick={handleDeleteOption} disableRipple key="delete">
            <DeleteIcon />
            Eliminar
          </MenuItem>,
        ]}
      </StyledMenu>
      <StyledDialog open={modal} onClose={closeModal}>
        <DialogTitle
          sx={{
            fontSize: "18px",
            fontWeight: "600",
            textAlign: "center",
            color: "#fff",
            margin: 0,
            padding: 1,
          }}
        >
          {isEditing ? "Editar " : "Agregar "}
          {label}
        </DialogTitle>
        <DialogContent
          sx={{
            margin: "0 5px 5px",
            padding: "0 2rem 0.5rem",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            background: colors.bgTable,
            gap: 3,
          }}
        >
          <form onSubmit={onSubmit}>
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: "El nombre es requerido" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={label}
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    autoComplete="off"
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <DialogActions>
                <Button variant="contained" onClick={onSubmit}>
                  {isEditing ? "Editar" : "Agregar"}
                </Button>
                <Button onClick={closeModal}>Cancelar</Button>
              </DialogActions>
            </Box>
          </form>
        </DialogContent>
      </StyledDialog>
    </>
  );
};
export default MenuSelect;

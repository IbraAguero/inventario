import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledDialog } from "./styledComponents/StyledDialog";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import SelectInput from "@mui/material/Select/SelectInput";
import SelectFieldCustom from "./fields/SelectFieldCustom";
import { useFormContext } from "react-hook-form";
import { useGetOptionsQuery } from "../app/api/optionsApiSlice";
import FormComponent from "./FormComponent";

const ComponentList = ({ title, name, url }) => {
  const [modalAdd, setModalAdd] = useState(false);
  const [valueName, setValueName] = useState("");
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  const { data, error, isLoading } = useGetOptionsQuery(`computadoras/${url}`, {
    skip: !value,
  });

  console.log(data);

  useEffect(() => {
    if (value) {
      const filterValue = data?.find((cpu) => cpu._id === value);

      setValueName(`${filterValue?.maker?.name} ${filterValue?.model}`);
    }
  }, [data, value]);

  const deleteComponent = () => {
    setValue(name, "");
    setValueName("");
  };

  const openModalAdd = () => {
    setModalAdd(true);
  };
  const closeModalAdd = () => {
    setModalAdd(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" align="center">
          <span style={{ fontWeight: "bold" }}>{title}:</span> {valueName}
        </Typography>
        <Box display="flex" gap={0.5}>
          {value ? (
            <>
              <Button
                variant="contained"
                size="small"
                color="inherit"
                onClick={openModalAdd}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                style={{ maxWidth: "36px", minWidth: "36px" }}
                onClick={deleteComponent}
              >
                <DeleteIcon sx={{ padding: 0 }} />
              </Button>
            </>
          ) : (
            <Button variant="contained" size="small" onClick={openModalAdd}>
              Agregar
            </Button>
          )}
        </Box>
        <FormComponent
          title={title}
          name={name}
          url={url}
          data={data}
          value={value}
          modalAdd={modalAdd}
          closeModalAdd={closeModalAdd}
        />
      </Box>
    </>
  );
};

export default ComponentList;

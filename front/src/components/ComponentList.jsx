import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledDialog } from "./styledComponents/StyledDialog";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import SelectInput from "@mui/material/Select/SelectInput";
import SelectFieldCustom from "./fields/SelectFieldCustom";
import CpuForm from "../features/computers/Forms/CpuForm";

const ComponentList = ({ title, value }) => {
  const [modalAdd, setModalAdd] = useState(false);

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
          <span style={{ fontWeight: "bold" }}>{title}:</span> {value}
        </Typography>
        <Box display="flex" gap={0.5}>
          {value ? (
            <>
              <Button variant="contained" size="small" color="inherit">
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                style={{ maxWidth: "36px", minWidth: "36px" }}
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
        <CpuForm
          title={title}
          modalAdd={modalAdd}
          closeModalAdd={closeModalAdd}
        />
      </Box>
    </>
  );
};

export default ComponentList;

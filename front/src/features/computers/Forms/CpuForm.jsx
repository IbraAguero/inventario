import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { StyledDialog } from "../../../components/styledComponents/StyledDialog";
import SelectFieldCustom from "../../../components/fields/SelectFieldCustom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import { useGetOptionsQuery } from "../../../app/api/optionsApiSlice";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const defaultValues = {
  maker: "",
  model: "",
};

const CpuForm = ({ title, modalAdd, closeModalAdd }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [uniqueMakers, setUniqueMakers] = useState([]);

  const { data, error, isLoading } = useGetOptionsQuery("computadoras/cpu");

  useEffect(() => {
    const seenIds = new Set();
    const updatedMakers = data?.reduce((acc, component) => {
      const id = component.maker._id;
      if (!seenIds.has(id)) {
        seenIds.add(id);
        acc.push({ id, name: component.maker.name });
      }
      return acc;
    }, []);

    setUniqueMakers(updatedMakers);
  }, [data]);

  console.log(uniqueMakers);

  /* const filteredModels = data?.filter(
    (component) => component.maker === selectedMaker
  ); */

  const methods = useForm({ defaultValues });

  const { handleSubmit, reset, trigger, formState, watch } = methods;
  const { isSubmitting } = formState;

  const maker = watch("maker");
  console.log(maker);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <StyledDialog open={modalAdd} onClose={closeModalAdd}>
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
        Agregar {title}
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
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            gap: 2,
            width: "300px",
          }}
        >
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <SelectFieldCustom
                name="maker"
                label="Fabricante"
                data={uniqueMakers}
                fullWidth
              />
              <DialogActions>
                <Button onClick={closeModalAdd}>Cancelar</Button>
                <Button type="submit" variant="contained">
                  Agregar
                </Button>
              </DialogActions>
            </form>
          </FormProvider>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};
export default CpuForm;
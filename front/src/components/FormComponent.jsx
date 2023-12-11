import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { StyledDialog } from "./styledComponents/StyledDialog";
import SelectFieldCustom from "./fields/SelectFieldCustom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useGetOptionsQuery } from "../app/api/optionsApiSlice";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const defaultValues = {
  maker: "",
  model: "",
};

const FormComponent = ({
  title,
  name,
  value,
  url,
  modalAdd,
  closeModalAdd,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [uniqueMakers, setUniqueMakers] = useState([]);
  const [makers, setMakers] = useState([]);
  const [models, setModels] = useState([]);

  const { data, error, isLoading } = useGetOptionsQuery(`computadoras/${url}`);

  const methods = useForm({ defaultValues });

  const { setValue: setValueContext } = useFormContext();
  const { handleSubmit, reset, formState, watch, setValue } = methods;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (value) {
      console.log("value in effect");
      console.log(value);

      const initialValues = data?.find((component) => component._id === value);

      console.log(initialValues);
      if (initialValues) {
        setValue("maker", initialValues.maker._id);

        const filteredModels = data.filter(
          (component) => component.maker._id === initialValues.maker._id
        );

        const uniqueModels = [
          ...new Set(
            filteredModels.map((component) => ({
              id: component._id,
              name: component.model,
            }))
          ),
        ];

        const initialModel = uniqueModels.find(
          (component) => component.id === initialValues._id
        );

        setValue("model", initialModel.id);
        setModels(uniqueModels);
      }
    } else {
      reset();
    }
  }, [modalAdd, value]);

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

  const closeModal = () => {
    closeModalAdd();
  };

  const handleMakerChange = (event) => {
    const selectedMaker = event.target.value;
    setValue("maker", selectedMaker);

    const filteredModels = data?.filter(
      (component) => component.maker._id === selectedMaker
    );

    const uniqueModels = [
      ...new Set(
        filteredModels?.map((component) => ({
          id: component._id,
          name: component.model,
        }))
      ),
    ];

    setModels(uniqueModels);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data.model);
    setValueContext(name, data.model);

    // CORREGIR
    closeModal();
  });

  return (
    <StyledDialog open={modalAdd} onClose={closeModal}>
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
            gap: 2,
          }}
        >
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <SelectFieldCustom
                  name="maker"
                  label="Fabricante"
                  data={uniqueMakers}
                  onChange={handleMakerChange}
                  fullWidth
                />
                <SelectFieldCustom
                  name="model"
                  label="Modelo"
                  data={models}
                  fullWidth
                />
                <DialogActions>
                  <Button onClick={closeModalAdd}>Cancelar</Button>
                  <Button type="submit" variant="contained">
                    Agregar
                  </Button>
                </DialogActions>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};
export default FormComponent;

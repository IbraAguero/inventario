import {
  Alert,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { StyledDialog } from "../../components/styledComponents/StyledDialog";
import defaultValues from "./FormModel/formInitialValues";
import { useModal } from "../../context/ModalContext";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateComputerMutation,
  useGetComputersQuery,
  useUpdateComputerMutation,
} from "./computersApiSlice";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import TecnicalForm from "./Forms/TecnicalForm";
import computerFormModel from "./FormModel/computerFormModel";
import ComponentsForm from "./Forms/ComponentsForm";
import validationSchema from "./FormModel/validationSchema";
import AditionalForm from "./Forms/AditionalForm";
import { enqueueSnackbar } from "notistack";

const steps = ["Informacion Tecnica", "Componentes", "Informacion Adicional"];

const { formId, formField } = computerFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <TecnicalForm formField={formField} />;
    case 1:
      return <ComponentsForm formField={formField} />;
    case 2:
      return <AditionalForm formField={formField} />;

    default:
      return <div>Not found</div>;
  }
}

const FormComputer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { modalOpen, closeModal } = useModal();
  const navigate = useNavigate();
  const params = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [errContent, setErrContent] = useState("");
  const currentValidationSchema = validationSchema[activeStep];

  useTitle(
    params.id
      ? "Editar computadora | Inventario"
      : "Agregar computadora | Inventario"
  );

  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });

  const { computer } = useGetComputersQuery("computersList", {
    selectFromResult: ({ data }) => ({
      computer: data?.entities[params.id],
    }),
    skip: !params.id,
  });

  useEffect(() => {
    if (computer) {
      const parseComputer = {
        ...computer,
        [formField.motherBoard.name]: computer.motherBoard._id,
        [formField.cpu.name]: computer.cpu._id,
        [formField.ram.name]: computer.ram._id,
        [formField.hdd.name]: computer.hdd._id,
        [formField.graphicCard.name]: computer.graphicCard._id,
        [formField.place.name]: computer.place._id,
        [formField.state.name]: computer.state._id,
        [formField.supplier.name]: computer.supplier?._id,
      };
      reset(parseComputer);
    }
  }, [computer]);

  const { handleSubmit, reset, trigger, formState, watch, setValue } = methods;
  const { isSubmitting } = formState;

  const [createComputer, { data, isSuccess, isLoading, error }] =
    useCreateComputerMutation();
  const [
    updateComputer,
    {
      data: dataUpd,
      isSuccess: isUpdSuccess,
      isLoading: isUpdLoading,
      error: errorUpd,
    },
  ] = useUpdateComputerMutation();

  console.log(errorUpd);

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log(watch());

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isLastStep) {
      try {
        if (params.id) {
          await updateComputer(data);
          console.log(data);
        } else {
          await createComputer(data);
          console.log(data);
        }
      } catch (err) {
        console.error("Error al agregar la computadora:", err);
      }
    } else {
      handleNext();
    }
  });

  useEffect(() => {
    if (isSuccess || isUpdSuccess) {
      navigate("/computadoras");
      handleReset();
      enqueueSnackbar(data?.message || dataUpd?.message, {
        variant: "success",
      });
    }
  }, [isSuccess, isUpdSuccess]);

  useEffect(() => {
    setErrContent(error?.data?.message || errorUpd?.data?.message) ?? "";

    setTimeout(() => {
      setErrContent("");
    }, 3000);
  }, [error, errorUpd]);

  return (
    <StyledDialog open={modalOpen} onClose={closeModal} fullWidth>
      <DialogTitle
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          textAlign: "center",
          color: "#fff",
          margin: 0,
          padding: 1,
        }}
      >
        {params.id ? "Editar Computadora" : "Agregar Computadora"}
      </DialogTitle>
      <DialogContent
        sx={{
          margin: "0 5px 5px",
          padding: "0 4rem 2rem",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          background: colors.bgTable,
          gap: 3,
        }}
      >
        <Stepper
          activeStep={activeStep}
          sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {errContent && <Alert severity="error">{errContent}</Alert>}
        <>
          {activeStep === steps.length ? (
            <h5>Formulario Enviado</h5>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                {_renderStepContent(activeStep)}
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{ paddingTop: "5vh" }}
                >
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Atras
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                      loading={isLoading || isUpdLoading}
                    >
                      Enviar
                    </LoadingButton>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Siguiente
                    </Button>
                  )}
                </Box>
              </form>
            </FormProvider>
          )}
        </>
      </DialogContent>
    </StyledDialog>
  );
};

export default FormComputer;

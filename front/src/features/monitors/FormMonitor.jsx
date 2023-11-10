import { useEffect, useState } from "react";
import { StyledDialog } from "../../components/styledComponents/StyledDialog";
import { useModal } from "../../context/ModalContext";
import validationSchema from "./FormModel/validationSchema";
import defaultValues from "./FormModel/formInitialValues";
import AditionalForm from "./Forms/AditionalForm";
import TecnicalForm from "./Forms/TecnicalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

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
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useTitle from "../../hooks/useTitle";
import monitorFormModel from "./FormModel/monitorFormModel";
import {
  useCreateMonitorMutation,
  useGetMonitorsQuery,
  useUpdateMonitorMutation,
} from "./monitorsApiSlice";

const { formField } = monitorFormModel;

const steps = ["Informacion Tecnica", "Informacion Adicional"];

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <TecnicalForm formField={formField} />;
    case 1:
      return <AditionalForm formField={formField} />;
    default:
      return <div>Not found</div>;
  }
}

const FormMonitor = () => {
  const { modalOpen, closeModal } = useModal();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(0);
  const [errContent, setErrContent] = useState("");
  const currentValidationSchema = validationSchema[activeStep];

  const navigate = useNavigate();
  const params = useParams();

  const { monitor } = useGetMonitorsQuery("monitorsList", {
    selectFromResult: ({ data }) => ({
      monitor: data?.entities[params.id],
    }),
  });

  useTitle(
    params.id ? "Editar monitor | Inventario" : "Agregar monitor | Inventario"
  );

  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });

  const { handleSubmit, reset, trigger, formState } = methods;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (monitor) {
      const parseMonitor = {
        ...monitor,
        [formField.maker.name]: monitor.maker._id,
        [formField.model.name]: monitor.model._id,
        [formField.type.name]: monitor.type?._id,
        [formField.place.name]: monitor.place._id,
        [formField.state.name]: monitor.state._id,
        [formField.supplier.name]: monitor.supplier?._id,
      };
      reset(parseMonitor);
    }
  }, [monitor]);

  const [createMonitor, { data, isSuccess, isLoading, error }] =
    useCreateMonitorMutation();
  const [
    updateMonitor,
    {
      data: dataUpd,
      isSuccess: isUpdSuccess,
      isLoading: isUpdLoading,
      error: errorUpd,
    },
  ] = useUpdateMonitorMutation();

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isLastStep) {
      try {
        if (params.id) {
          await updateMonitor(data);
          console.log(data);
        } else {
          await createMonitor(data);
          console.log(data);
        }
      } catch (err) {
        console.error("Error al agregar el monitor:", err);
      }
    } else {
      handleNext();
    }
  });

  useEffect(() => {
    if (isSuccess || isUpdSuccess) {
      navigate("/monitores");
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
    <>
      <StyledDialog
        open={modalOpen}
        onClose={closeModal}
        fullWidth
        /* maxWidth="md" */
      >
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
          {params.id ? "Editar Monitor" : "Agregar Monitor"}
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
          <Box sx={{ marginTop: "2rem" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
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
    </>
  );
};
export default FormMonitor;

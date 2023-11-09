import { useEffect, useState } from "react";
import { StyledDialog } from "../../components/styledComponents/StyledDialog";
import { useModal } from "../../context/ModalContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, Box, DialogContent, DialogTitle, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useTitle from "../../hooks/useTitle";
import { useCreateUserMutation } from "./usersApiSlice";
import { TextFieldCustom } from "../../components/fields/TextFieldCustom";
import SelectFieldCustom from "../../components/fields/SelectFieldCustom";
import PasswordField from "../../components/fields/PasswordField";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .required("Confirme su contraseña")
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  rol: yup
    .string()
    .oneOf(["Administrador", "Tecnico", "Empleado"], "Rol no válido")
    .required("El rol es obligatorio"),
});

const defaultValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  rol: "",
};

const ROLES = [
  { name: "Empleado", id: "Empleado" },
  { name: "Tecnico", id: "Tecnico" },
  { name: "Administrador", id: "Administrador" },
];

const FormPrinter = () => {
  const { modalOpen, closeModal } = useModal();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errContent, setErrContent] = useState("");

  const [createUser, { data, error, isLoading, isSuccess }] =
    useCreateUserMutation();

  const navigate = useNavigate();
  useTitle("Agregar usuario | Inventario");

  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(schema),
    //mode: 'onChange',
  });

  const { handleSubmit, reset, trigger, formState, watch } = methods;
  const { isSubmitting } = formState;

  const handleReset = () => {
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      createUser(data);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/usuarios");
      handleReset();
      enqueueSnackbar(data?.message, {
        variant: "success",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    setErrContent(error?.data?.message) ?? "";

    setTimeout(() => {
      setErrContent("");
    }, 4000);
  }, [error]);

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
          {"Agregar usuario"}
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
          <Box sx={{ marginTop: "2rem" }}></Box>
          {errContent && <Alert severity="error">{errContent}</Alert>}
          <>
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextFieldCustom name="name" label="Nombre" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextFieldCustom name="lastName" label="Apellido" />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextFieldCustom name="email" label="Correo electronico" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SelectFieldCustom name="rol" label="Rol" data={ROLES} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <PasswordField name="password" label="Contraseña" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <PasswordField
                      name="confirmPassword"
                      label="Confirmar contraseña"
                    />
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{ paddingTop: "5vh" }}
                >
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                    loading={isLoading}
                  >
                    Enviar
                  </LoadingButton>
                </Box>
              </form>
            </FormProvider>
          </>
        </DialogContent>
      </StyledDialog>
    </>
  );
};
export default FormPrinter;

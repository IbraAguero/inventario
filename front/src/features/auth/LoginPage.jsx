import { useEffect, useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation, useSendLogoutMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import useTitle from '../../hooks/useTitle';
import PasswordField from '../../components/fields/PasswordField';
import { TextFieldCustom } from '../../components/fields/TextFieldCustom';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('El email no es valido')
    .required('Ingrese un email'),
  password: yup.string().required('Ingrese una contraseña'),
});

const LoginPage = () => {
  useTitle('Login | Inventario');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = methods;

  const [login, { isLoading }] = useLoginMutation();
  const [errMsg, setErrMsg] = useState('');

  // Inicializa el valor 'persist' desde localStorage o en 'false' si no se encuentra
  const [persist, setPersist] = usePersist();

  /* const onSubmit = async (data) => {
    try {
      const { accessToken } = await login(data).unwrap();
      dispatch(setCredentials({ accessToken }));
      reset();
      navigate('/dash');
    } catch (err) {
      // Manejar errores
    }
  }; */

  const [sendLogout] = useSendLogoutMutation();

  useEffect(() => {
    sendLogout();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { accessToken } = await login(data).unwrap();
      dispatch(setCredentials({ accessToken }));
      reset();
      navigate('/impresoras');
    } catch (err) {
      setErrMsg(err.data?.message);
    }
  });

  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  //const errRef = useRef();

  const handleToggle = () => setPersist((prev) => !prev);

  //if (isLoading) return <PulseLoader color={'#FFF'} />;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor={colors.primary}
    >
      <Box
        minWidth={400}
        p={5}
        pt={5}
        boxShadow={8}
        borderRadius={5}
        bgcolor={colors.primary[700]}
        width={{ xs: '10', md: '8', lg: '4' }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h2" component="h1" fontWeight={700}>
            Bienvenido!
          </Typography>
          <Typography variant="h6" component="small">
            ingrese para continuar
          </Typography>
        </Box>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {errMsg && <Alert severity="error">{errMsg}</Alert>}
              <TextFieldCustom name="email" label="Email" autoComplete="off" />
              {/* <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    autoComplete="off"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              /> */}
              {/* <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <PasswordField
                    label="Contraseña"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              /> */}
              <PasswordField name="password" label="Contraseña" />
              <label htmlFor="persist">
                <Checkbox
                  id="persist"
                  onChange={handleToggle}
                  checked={persist}
                />
                Mantener sesion
              </label>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                disabled={isSubmitting}
                loading={isLoading}
              >
                Iniciar Sesión
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
        <Typography textAlign="center">
          Olvidaste tu contraseña?{' '}
          <Link component={NavLink} to="/recuperar-contraseña">
            Recuperar contraseña
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;

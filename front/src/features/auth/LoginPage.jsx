import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation, useSendLogoutMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('El email no es valido')
    .required('Ingrese un email'),
  password: yup.string().required('Ingrese una contraseña'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

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
        <form onSubmit={onSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {errMsg && <Alert severity="error">{errMsg}</Alert>}
            <Controller
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
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl
                  variant="outlined"
                  error={!!errors.password}
                  {...field}
                  //helperText={errors.email?.message}
                >
                  <InputLabel>Contraseña</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                  {errors.password && (
                    <FormHelperText>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
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
              sx={{ mt: 2, mb: 2 }}
              disabled={isSubmitting}
              loading={isLoading}
            >
              Iniciar Sesión
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;

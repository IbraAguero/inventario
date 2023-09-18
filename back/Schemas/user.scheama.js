import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string({ required_error: 'Campo requerido' }),
  email: z
    .string({ required_error: 'Campo requerido' })
    .email({ message: 'El email no es valido' }),
  password: z
    .string({ required_error: 'Campo requerido' })
    .min(8, { message: 'La contraseña debe tener almenos 8 caracteres' }),
  rol: z.enum(['Empleado', 'Tecnico', 'Administrador']).optional(),
});

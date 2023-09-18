import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc Login
// @route POST /auth
// @access Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Todos los campos son obligatorios' });
  }

  const foundUser = await User.findOne({ email }).lean().exec();

  if (!foundUser) {
    return res
      .status(401)
      .json({ message: 'Los datos ingresados son incorrectos' });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res
      .status(401)
      .json({ message: 'Los datos ingresados son incorrectos' });

  if (!foundUser.active) {
    return res
      .status(401)
      .json({ message: 'El usuario se encuentra inactivo' });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        id: foundUser._id,
        rol: foundUser.rol,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  // Crear cookie segura con el token de actualización
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // accesible solo por el servidor web
    secure: true, // https
    sameSite: 'None', // cookie entre sitios
    maxAge: 7 * 24 * 60 * 60 * 1000, // vencimiento de la cookie: establecido para que coincida con refreshToken
  });

  // Enviar accessToken que contiene el nombre de usuario y roles
  res.json({ accessToken });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - porque el token de acceso ha caducado
export const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'No autorizado' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Prohibido' });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: 'No autorizado' });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            id: foundUser._id,
            rol: foundUser.rol,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - solo para borrar la cookie si existe
export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // Sin contenido
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Cookie eliminada' });
};

import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

//import Note from '../models/Note.js';

// @desc Obtener todos los usuarios
// @route GET /users
// @access Privado
export const getAllUsers = async (req, res) => {
  // Obtener todos los usuarios de MongoDB
  const users = await User.find().select("-password").lean();

  // Si no hay usuarios
  if (!users?.length) {
    return res.status(400).json({ message: "No se encontraron usuarios" });
  }

  res.json(users);
};

// @desc Crear un nuevo usuario
// @route POST /users
// @access Privado
export const createNewUser = async (req, res) => {
  const { name, lastName, password, email, rol } = req.validData;

  // Comprobar si ya existe el nombre de usuario
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "El email ya esta en uso" });
  }

  // Hashear la contraseña
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const newUser = new User({
    name,
    lastName,
    email,
    rol,
    password: hashedPwd,
  });

  const userSaved = await newUser.save();

  if (userSaved) {
    // creado
    res.status(201).json({
      message: `El usuario ${name} ha sido creado`,
      newUser: userSaved,
    });
  } else {
    res.status(400).json({ message: "Datos de usuario no válidos" });
  }
};

// @desc Actualizar un usuario
// @route PATCH /users
// @access Privado
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, lastName, email, rol, active, password } = req.validData;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de fabricante inválido" });
    }

    // ¿Existe el usuario a actualizar?
    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Comprobar duplicados
    if (email) {
      const duplicate = await User.findOne({ email })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

      // Permitir actualizaciones en el usuario original
      if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Email duplicado" });
      }
    }

    if (name) {
      user.name = name;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (rol) {
      user.rol = rol;
    }
    if (email) {
      user.email = email;
    }
    if (active !== undefined) {
      user.active = active;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.name} actualizado` });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

// @desc Eliminar un usuario
// @route DELETE /users
// @access Privado
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Confirmar los datos
    if (!id) {
      return res.status(400).json({ message: "Se requiere el ID de usuario" });
    }

    // ¿Existe el usuario a eliminar?
    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const result = await user.deleteOne();

    const reply = `Nombre de usuario ${result.username} con ID ${result._id} eliminado`;

    res.json(reply);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

import { Computer } from "../models/computer.model.js";
import { MotherBoard } from "../models/computer.model.js";
import { CPU } from "../models/computer.model.js";
import { RAM } from "../models/computer.model.js";
import { HDD } from "../models/computer.model.js";
import { GraphicCard } from "../models/computer.model.js";
import Place from "../models/place.model.js";
import State from "../models/state.model.js";
import Supplier from "../models/supplier.model.js";
import mongoose from "mongoose";

export const getComputers = async (req, res) => {
  try {
    const computers = await Computer.find()
      .populate({
        path: "motherBoard",
        select: "model",
        populate: {
          path: "maker",
          select: "name",
        },
      })
      .populate({
        path: "cpu",
        select: "model",
        populate: {
          path: "maker",
          select: "name",
        },
      })
      .populate({
        path: "ram",
        select: "model capacity",
        populate: {
          path: "maker",
          select: "name",
        },
      })
      .populate({
        path: "hdd",
        select: "model capacity",
        populate: {
          path: "maker",
          select: "name",
        },
      })
      .populate({
        path: "graphicCard",
        select: "model memory",
        populate: {
          path: "maker",
          select: "name",
        },
      })
      .populate("place state createdBy", "name email")
      .lean();

    return res.json(computers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* export const getComputer = async (req, res) => {
  try {

    const computer = await Computer.findById(id)
      .populate(
        "cpu ram hdd motherBoard graphicCard place state supplier createdBy",
        "maker model capacity name username email"
      )
      .lean();

    if (!computer)
      return res.status(404).json({ message: "Computadora no encontrada" });
    return res.json(computer);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}; */

export const createComputer = async (req, res) => {
  try {
    const {
      nroinventario,
      nroserie,
      motherBoard,
      cpu,
      ram,
      hdd,
      graphicCard,
      place,
      state,
      supplier,
      order,
      comment,
      mandated,
    } = req.validData;

    const validCpu = await CPU.exists({ _id: cpu });
    if (!validCpu) {
      return res.status(400).json({ message: "No existe el cpu ingresado" });
    }

    const validRAM = await RAM.exists({ _id: ram });
    if (!validRAM) {
      return res.status(400).json({ message: "No existe la RAM ingresada" });
    }

    if (motherBoard) {
      const validMotherBoard = await MotherBoard.exists({ _id: motherBoard });
      if (!validMotherBoard) {
        return res
          .status(400)
          .json({ message: "No existe la placa madre ingresada" });
      }
    }

    const validHDD = await HDD.exists({ _id: hdd });
    if (!validHDD) {
      return res
        .status(400)
        .json({ message: "No existe el disco duro ingresado" });
    }

    if (graphicCard) {
      const validGraphicCard = await GraphicCard.exists({ _id: graphicCard });
      if (!validGraphicCard) {
        return res
          .status(400)
          .json({ message: "No existe la tarjeta grafica ingresada" });
      }
    }

    const validState = await State.exists({ _id: state });
    if (!validState) {
      return res.status(400).json({ message: "No existe el estado ingresado" });
    }

    const validPlace = await Place.exists({ _id: place });
    if (!validPlace) {
      return res.status(400).json({ message: "No existe el lugar ingresado" });
    }

    if (supplier) {
      const validSuplier = await Supplier.exists({ _id: supplier });
      if (!validSuplier) {
        return res
          .status(400)
          .json({ message: "No existe el proveedor ingresado" });
      }
    }

    const computerFound = await Computer.findOne({ nroinventario });
    if (computerFound)
      return res
        .status(400)
        .json({ message: "El nroinventario ya esta en uso" });

    const newComputer = new Computer({
      nroinventario,
      nroserie,
      motherBoard,
      cpu,
      ram,
      hdd,
      graphicCard,
      place,
      state,
      supplier,
      order,
      mandated,
      comment,
      createdBy: req.userId,
    });
    const savedComputer = await newComputer.save();

    return res.status(201).json({
      data: savedComputer,
      message: "Computadora creada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateComputer = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de fabricante inválido" });
    }

    const {
      nroinventario,
      nroserie,
      motherBoard,
      cpu,
      ram,
      hdd,
      graphicCard,
      place,
      state,
      supplier,
      order,
      comment,
      mandated,
    } = req.validData;

    const validCpu = await CPU.exists({ _id: cpu });
    if (!validCpu) {
      return res.status(400).json({ message: "No existe el cpu ingresado" });
    }

    const validRAM = await RAM.exists({ _id: ram });
    if (!validRAM) {
      return res.status(400).json({ message: "No existe la RAM ingresada" });
    }

    if (motherBoard) {
      const validMotherBoard = await MotherBoard.exists({ _id: motherBoard });
      if (!validMotherBoard) {
        return res
          .status(400)
          .json({ message: "No existe la placa madre ingresada" });
      }
    }

    const validHDD = await HDD.exists({ _id: hdd });
    if (!validHDD) {
      return res
        .status(400)
        .json({ message: "No existe el disco duro ingresado" });
    }

    if (graphicCard) {
      const validGraphicCard = await GraphicCard.exists({ _id: graphicCard });
      if (!validGraphicCard) {
        return res
          .status(400)
          .json({ message: "No existe la tarjeta grafica ingresada" });
      }
    }

    const validState = await State.exists({ _id: state });
    if (!validState) {
      return res.status(400).json({ message: "No existe el estado ingresado" });
    }

    const validPlace = await Place.exists({ _id: place });
    if (!validPlace) {
      return res.status(400).json({ message: "No existe el lugar ingresado" });
    }

    if (supplier) {
      const validSuplier = await Supplier.exists({ _id: supplier });
      if (!validSuplier) {
        return res
          .status(400)
          .json({ message: "No existe el proveedor ingresado" });
      }
    }

    const computerFound = await Computer.findOne({
      nroinventario,
      _id: { $ne: id },
    });
    if (computerFound)
      return res
        .status(400)
        .json({ message: "El nroinventario ya esta en uso" });

    const computer = await Computer.findById(id);

    if (!computer)
      return res.status(404).json({ message: "Computadora no encontrada" });

    const change = {
      user: req.userId,
      values: [],
    };

    if (place !== computer.place.toString()) {
      const oldPlace = await Place.findById(computer.place);
      const newPlace = await Place.findById(place);

      change.values.push({
        field: "Lugar",
        oldValue: oldPlace.name,
        newValue: newPlace.name,
      });
      computer.place = place;
    }

    if (state !== computer.state.toString()) {
      const oldState = await State.findById(computer.state);
      const newState = await State.findById(state);

      change.values.push({
        field: "Estado",
        oldValue: oldState.name,
        newValue: newState.name,
      });
      computer.state = state;
    }

    if (mandated !== computer.mandated) {
      change.values.push({
        field: "Encargado",
        oldValue: computer.mandated,
        newValue: mandated,
      });
      computer.mandated = mandated;
    }

    if (comment !== computer.comment) {
      change.values.push({
        field: "Comentario",
        oldValue: computer.comment,
        newValue: comment,
      });
      computer.comment = comment;
    }

    if (change.values.length > 0) {
      computer.changes.push(change);
    }

    computer.nroserie = nroserie;
    computer.nroinventario = nroinventario;
    computer.motherBoard = motherBoard;
    computer.cpu = cpu;
    computer.ram = ram;
    computer.hdd = hdd;
    computer.graphicCard = graphicCard;
    computer.supplier = supplier;
    computer.order = order;

    await computer.save();

    return res.status(201).json({
      data: computer,
      message: "Computadora editada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteComputer = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de fabricante inválido" });
    }

    const computer = await Computer.findByIdAndDelete(id);

    if (!computer)
      return res.status(404).json({ message: "Computadora no encontrada" });

    return res
      .sendStatus(204)
      .json({ message: "Computadora eliminada exitosamente!" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

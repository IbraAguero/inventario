import { Computer } from "../models/computer.model.js";
import Peripheral from "../models/peripheral.model.js";
import Monitor from "../models/monitor.model.js";
import Printer from "../models/printer.model.js";
import Network from "../models/network.model.js";
import State from "../models/state.model.js";
import Place from "../models/place.model.js";

export const getTotalDevices = async (req, res) => {
  try {
    const computersCount = await Computer.countDocuments();
    const peripheralsCount = await Peripheral.countDocuments();
    const monitorsCount = await Monitor.countDocuments();
    const printersCount = await Printer.countDocuments();
    const networksCount = await Network.countDocuments();

    return res.json({
      Computadoras: computersCount,
      Monitores: monitorsCount,
      Impresoras: printersCount,
      Perifericos: peripheralsCount,
      Redes: networksCount,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getDevicesByState = async (req, res) => {
  try {
    const states = await State.find();

    const devicesByState = [];

    for (const state of states) {
      const computersCount = await Computer.countDocuments({
        state: state._id,
      });
      const peripheralsCount = await Peripheral.countDocuments({
        state: state._id,
      });
      const monitorsCount = await Monitor.countDocuments({ state: state._id });
      const printersCount = await Printer.countDocuments({ state: state._id });
      const networksCount = await Network.countDocuments({ state: state._id });

      const stateObject = {
        estado: state.name,
        Impresoras: printersCount,
        Computadoras: computersCount,
        Monitores: monitorsCount,
        Perifericos: peripheralsCount,
        Redes: networksCount,
      };
      devicesByState.push(stateObject);
    }

    return res.json(devicesByState);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getDevicesByPlace = async (req, res) => {
  try {
    const places = await Place.find();

    const devicesByPlace = {};

    for (const place of places) {
      const computersCount = await Computer.countDocuments({
        place: place._id,
      });
      const peripheralsCount = await Peripheral.countDocuments({
        place: place._id,
      });
      const monitorsCount = await Monitor.countDocuments({ place: place._id });
      const printersCount = await Printer.countDocuments({ place: place._id });
      const networksCount = await Network.countDocuments({ place: place._id });

      devicesByPlace[place.name] = {
        Computadoras: computersCount,
        Perifericos: peripheralsCount,
        Monitores: monitorsCount,
        Impresoras: printersCount,
        Redes: networksCount,
      };
    }

    return res.json(devicesByPlace);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLatestDeviceAggregations = async (req, res) => {
  try {
    const allDevices = await Promise.all([
      Computer.find()
        .select("nroinventario place createdAt")
        .populate("place", "name")
        .lean(),
      Peripheral.find()
        .select("nroinventario place createdAt")
        .populate("place", "name")
        .lean(),
      Monitor.find()
        .select("nroinventario place createdAt")
        .populate("place", "name")
        .lean(),
      Printer.find()
        .select("nroinventario place createdAt")
        .populate("place", "name")
        .lean(),
      Network.find()
        .select("nroinventario place createdAt")
        .populate("place", "name")
        .lean(),
    ]);

    const combinedDevices = allDevices
      .flat()
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10);

    return res.json(combinedDevices);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import {
  getTotalDevices,
  getDevicesByPlace,
  getDevicesByState,
  getLatestDeviceAggregations,
} from "../controllers/statistics.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/dispositivos", getTotalDevices);
router.get("/dispositivos/estados", getDevicesByState);
router.get("/dispositivos/lugares", getDevicesByPlace);
router.get("/agregaciones", getLatestDeviceAggregations);

export default router;

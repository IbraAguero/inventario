import { Router } from "express";
//import { validateSchema } from '../middleware/validatorSchema.js';
//import { printerSchema } from '../schemas/printer.schema.js';
import {
  getComputers,
  createComputer,
  updateComputer,
  deleteComputer,
} from "../controllers/computer.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";
import cpuRoutes from "../routes/cpu.routes.js";
import ramRoutes from "../routes/ram.routes.js";
import motherBoardRoutes from "../routes/motherBoard.routes.js";
import hddRoutes from "../routes/hdd.routes.js";
import graphicCardRoutes from "../routes/graphicCard.routes.js";
import { validateSchema } from "../middleware/validatorSchema.js";
import { computerSchema } from "../Schemas/computer.schema.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getComputers);
//router.get("/:id", getComputer);
router.post("/", validateSchema(computerSchema), createComputer);
router.put("/:id", validateSchema(computerSchema.partial()), updateComputer);
router.delete("/:id", deleteComputer);

//router.use('/impresoras', authRequired, extractType, makerRoutes);

router.use("/placa-madre", motherBoardRoutes);
router.use("/cpu", cpuRoutes);
router.use("/ram", ramRoutes);
router.use("/hdd", hddRoutes);
router.use("/tarjeta-grafica", graphicCardRoutes);

export default router;

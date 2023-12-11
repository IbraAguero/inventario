import { Router } from "express";
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controller.js";
import { createUserSchema, updateUserSchema } from "../Schemas/user.scheama.js";
import { validateSchema } from "../middleware/validatorSchema.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getAllUsers);
router.post("/", validateSchema(createUserSchema), createNewUser);
router.put("/:id", validateSchema(updateUserSchema.partial()), updateUser);
router.delete("/", deleteUser);

export default router;

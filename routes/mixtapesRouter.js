import Router from "express";
import {
  createMixtape,
  getMixtape,
  updateMixtape,
  deleteMixtape,
  getPublicMixtapes,
} from "../controllers/mixtapesController.js";
import { protect } from "../controllers/usersController.js";

const router = Router();

router.route("/public").get(getPublicMixtapes);

router.use(protect);
router.route("/create").post(createMixtape);
router.route("/get/:id").get(getMixtape);
router.route("/edit/:id").patch(updateMixtape);
router.route("/delete/:id").delete(deleteMixtape);

export default router;

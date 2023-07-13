import { Router } from "express";
import MockingController from "../controllers/mockingController.js";

const router = Router()
const mockingController = new MockingController

router.get('/', mockingController.getMocks)

export default router
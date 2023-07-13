import { Router } from "express";
import SessionsController from "../controllers/sessionsController.js";

const router = Router()
const sessionsController = new SessionsController

router.get('/current', sessionsController.current)

export default router
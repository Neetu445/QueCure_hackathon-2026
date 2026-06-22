import express from "express";

import{addPatient, getQueue, callNext, completePatient} from "../controllers/patientController.js";



const router = express.Router();

router.post("/", addPatient);
router.get("/", getQueue);
router.patch("/next", callNext);
router.patch("/complete", completePatient);

export default router;
import express from "express";
import EmployeeController from "../controllers/Employee";
const router = express.Router();

router.post("/employees", EmployeeController.store);
router.get("/employees", EmployeeController.index);
router.put("/employees/:id", EmployeeController.update);
router.delete("/employees/:id", EmployeeController.delete);
router.get("/employees/:id", EmployeeController.findById);

export default router;
import express from "express";
import { newTask } from "../controllers/task.js";
import { getMyTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { updateTask } from "../controllers/task.js";
import { deleteTask } from "../controllers/task.js";

const router = express.Router();

router.post("/new" , isAuthenticated , newTask);
router.get("/my" , isAuthenticated , getMyTask);
// router.route(":/id").put(isAuthenticated , updateTask).delete(isAuthenticated , deleteTask);
router.put("/:id" , isAuthenticated , updateTask);
router.delete("/:id" , isAuthenticated , deleteTask);

export default router;
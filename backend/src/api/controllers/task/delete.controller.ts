import { Request, Response } from 'express';

import { ResponseFormatter } from "../../../utils/response-formatter";
import { AppError } from "../../services/auth/user/AppError";

import { TaskService } from '../../services/task/task.service';
import { TaskRepository } from '../../services/task/task.repository';
import { validateTask } from '../../validators/task/task.validator';


const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);



export const deleteTask = async (req: Request, res: Response) => {
    try{
        const userId = res.locals.userId;
        const taskId = req.query.taskId as string;

        await taskService.deleteTask(userId, taskId)
        return ResponseFormatter.success(res, "Task deleted");

    } catch (err) {
        if (err instanceof AppError) {
            return ResponseFormatter.error(res, err.statusCode, err.message);
        }
        return ResponseFormatter.error(res, 500, err.message || "An unexpected error occurred");
    }
}
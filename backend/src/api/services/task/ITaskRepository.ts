import { Task, User } from "@prisma/client";

export interface ITaskRepository{
    getTasks(userId: string): Promise<Task[]>;
    createTask(userId: string, task: Task): Promise<Task>;
    deleteTask(userId: string, taskId: string): Promise<void>;
    updateTask(userId: string, task: Task): Promise<Task>;
}
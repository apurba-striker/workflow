import { Task, User } from "@prisma/client";
import { ITaskRepository } from "./ITaskRepository";

export class TaskService {
    constructor(
        private taskRepository: ITaskRepository,
    ) {}

    async getTasks(userId: string): Promise<Task[]> {
        const tasks = await this.taskRepository.getTasks(userId);
        return tasks;
    }

    async createTask(userId: string, task: Task): Promise<Task> {
        const newTask = await this.taskRepository.createTask(userId, task);
        return newTask;
    }

    async updateTask(userId: string, task: Task): Promise<Task> {
        const newTask = await this.taskRepository.updateTask(userId, task);
        return newTask;
    }

    async deleteTask(userId: string, taskId: string): Promise<void> {
        await this.taskRepository.deleteTask(userId, taskId);
    }
}
import { Task, User } from "@prisma/client";

import { prisma } from '../../../utils/prisma'
import { AppError } from "../auth/user/AppError";
import { UserService } from "../auth/user/user.service";
import { UserRepository } from "../auth/user/user.repository";
import { PasswordHasher } from "../../../utils/password";
import { ITaskRepository } from "./ITaskRepository";

const userRepository = new UserRepository();
const passwordHasher = new PasswordHasher();
const userService = new UserService(userRepository, passwordHasher);

export class TaskRepository implements ITaskRepository {

    public async getTasks(userId: string): Promise<Task[]> {
        const existingUser = await userService.getUserById(userId);
        if(!existingUser) throw new AppError('User not found')
        
        const tasks = await prisma.task.findMany({
            where:{
                userId: userId,
            },
        });

        return tasks;
    }

    public async createTask(userId: string, task: Task): Promise<Task> {
        const existingUser = await userService.getUserById(userId);
        if(!existingUser) throw new AppError('User not found')
        
        const newTask = await prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                deadline: task.deadline,
                userId: existingUser.id
            }
        });
        return newTask;
    }

    public async deleteTask(userId: string, taskId: string): Promise<void> {
        const existingUser = await userService.getUserById(userId);
        if(!existingUser) throw new AppError('User not found')
        
        const existingTask = await prisma.task.findUnique({
            where: {
                id: taskId,
            }
        })
        if(!existingTask) throw new AppError('Task not found')
        if(existingTask.userId !== userId) throw new AppError('Unauthorized')
        
        await prisma.task.delete({
            where:{
                id: taskId,
            },
        });
    }

    public async updateTask(userId: string, task: Task): Promise<Task> {
        const existingUser = await userService.getUserById(userId);
        if(!existingUser) throw new AppError('User not found');

        const existingTask = await prisma.task.findUnique({
            where: {
                id: task.id,
            }
        })

        if(!existingTask) throw new AppError('Task not found')
        if(existingTask.userId !== userId) throw new AppError('Unauthorized')
        
        const newTask = await prisma.task.update({
            where: {
                id: task.id,
            },
            data: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                deadline: task.deadline,
                userId: existingUser.id
            }
        });
        return newTask;
    }
}
"use client"

import { Task, User } from "@/types"
import { TaskContainer } from "./task-container";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { startTransition, useState, useTransition } from "react";
import * as z from 'zod';
import { TaskSchema } from "@/schemas";
import { updateTask } from "@/actions/tasks/update-task.action";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface HomeClientProps {
    user: User;
    tasks: Task[];
}

enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    UNDER_REVIEW = "UNDER_REVIEW",
    COMPLETED = "COMPLETED"
}

type TaskSchemaType = z.infer<typeof TaskSchema>;

export const HomeClient = ({
    user,
    tasks: initialTasks,
}: HomeClientProps) => {

    const [tasks, setTasks] = useState(initialTasks);
    const [isPending, startTransitoon] = useTransition();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const { toast } = useToast();

    const updateTaskStatus = (task: any) => {
        setLoading(true);
        startTransition(() => {
            updateTask(task)
                .then((res) => {
                    if(res.success){
                        toast({
                            variant: "success",
                            title: "Success",
                        })
                    }
                    else if(res.error){
                        toast({
                            variant: "destructive",
                            title: "Something went wrong",
                        })
                    }
                })
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Something went wrong",
                    })
                })
                .finally(() => {
                    router.refresh();
                    setLoading(false);
                })
        })
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const updatedTasks = Array.from(tasks);
        const draggedTask = updatedTasks.find(task => task.id === draggableId);

        if (!draggedTask) {
            return;
        }

        updatedTasks.splice(updatedTasks.indexOf(draggedTask), 1);

        const updatedTask: TaskSchemaType = {
            id: draggedTask.id,
            //@ts-ignore
            title: draggedTask.title,
            status: destination.droppableId as TaskStatus,
            description: draggedTask.description,
            priority: draggedTask.priority,
            deadline: draggedTask.deadline,
        };

        const insertIndex = updatedTasks.findIndex(task => 
            task.status === destination.droppableId && 
            task.id === updatedTasks[destination.index]?.id
        );

        if (insertIndex === -1) {
            updatedTasks.push({
                ...draggedTask,
                status: destination.droppableId as TaskStatus
            });
        } else {
            updatedTasks.splice(insertIndex, 0, {
                ...draggedTask,
                status: destination.droppableId as TaskStatus
            });
        }

        setTasks(updatedTasks);
        updateTaskStatus(updatedTask);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full flex justify-between gap-2 bg-white rounded mt-4 px-4 py-4">
                <TaskContainer tasks={tasks} status={TaskStatus.TO_DO} title="To do" />
                <TaskContainer tasks={tasks} status={TaskStatus.IN_PROGRESS} title="In Progress" />
                <TaskContainer tasks={tasks} status={TaskStatus.UNDER_REVIEW} title="Under Review" />
                <TaskContainer tasks={tasks} status={TaskStatus.COMPLETED} title="Completed" />
            </div>
        </DragDropContext>
    )
}
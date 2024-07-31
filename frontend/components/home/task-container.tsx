"use client"

import { Task } from "@/types";
import { TaskCard } from "./task-card";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Status, useModal } from "@/hooks/use-modal-store";

interface TaskContainerProps {
    tasks: Task[];
    status: string;
    title: string;
}

interface RenderTasksByStatusProps{
    tasks: Task[];
    status: string;
}


const RenderTasksByStatus = ({
    tasks,
    status
} : RenderTasksByStatusProps) => {

    const { onOpen } = useModal();

    return (
        <>
            {tasks
                .filter(task => task.status === status)
                .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <TaskCard task={task} />
                            </div>
                        )}
                    </Draggable>
            ))}
            <Button 
                className="justify-between bg-neutral-700 dark:bg-neutral-200 dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 hover:opacity-70"
                onClick={() => {
                    onOpen('createTaskModal', undefined, undefined, status as Status)
                }}
            >
                <p>Add new</p>
                <Plus/>
            </Button>
        </>
    );
};

export const TaskContainer = ({ 
    tasks, 
    status, 
    title 
}: TaskContainerProps) => {
    return (
        <>
            <Droppable droppableId={status} type="task">
                {(provided) => (
                    <div
                        className="flex flex-col gap-2 w-1/4"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <h1>{title}</h1>
                        <div className="mt-2 flex flex-col gap-2">
                            <RenderTasksByStatus tasks={tasks} status={status}/>
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        </>
        
    );
};
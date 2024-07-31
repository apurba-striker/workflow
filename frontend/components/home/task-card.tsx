"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/types";
import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { useToast } from "../ui/use-toast";
import { deleteTask } from "@/actions/tasks/delete-task.action";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

interface TaskCard{
    task: Task;
}

export const TaskCard = ({
    task,
}: TaskCard) => {

    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { onOpen } = useModal();

    const handleDelete = () => {
        setLoading(true);
        startTransition(() => {
            deleteTask(task.id)
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
                    location.reload();
                    setLoading(false);
                })
        })
    }

    return (
        <Card className={`pt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <CardContent>
                <div className="w-full justify-between flex flex-row">
                    <h1 className={`w-[80%] font-semibold`}>{task.title}</h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis/>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            onOpen('editTaskModal', task.id, task)
                                        }}
                                    >
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        className="text-red-500"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                    
                </div>
                <div className="text-muted-foreground">
                    {task.description}
                </div>
                <div className={`
                    p-1 px-2 text-sm 
                    inline-block rounded mt-2 text-white
                    ${task.priority === "URGENT" ? 'bg-red-500' : 
                    task.priority === "MEDIUM" ? 'bg-orange-400' : 
                    task.priority === "LOW" ? 'bg-green-400' : ''}
                `}>
                    {task.priority}
                </div>
            </CardContent>
        </Card>
    )
}
"use client"

import { useCallback, useEffect, useState, useTransition } from "react";
import { Modal } from "./modal";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import * as z from 'zod';
import { TaskSchema } from "@/schemas";
import { DropdownInput } from "../ui/dropdown-input";
import DatePicker from "../ui/date-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createTask } from "@/actions/tasks/create-task.action";
import { useToast } from "../ui/use-toast";
import { updateTask } from "@/actions/tasks/update-task.action";



const statusLabels = {
    "TO_DO": "To Do",
    "IN_PROGRESS": "In Progress",
    "UNDER_REVIEW": "Under Review",
    "COMPLETED": "Completed",
};


export const EditTaskModal = () => {
    const { isOpen, onClose, type, task } = useModal();
    const isModalOpen = isOpen && type === "editTaskModal";
    const [loading, setLoading] = useState<boolean>(false);
    const [isPending, startTransiton] = useTransition();
    const { toast } = useToast();

    const router = useRouter();
    const form = useForm<z.infer<typeof TaskSchema>>({
        defaultValues: {
            title: task?.title || "",
            description: task?.description || "",
            status: task?.status || "",
            priority: task?.priority || "",
            deadline: task?.deadline ? new Date(task.deadline) : new Date(),
        },
    });

    useEffect(() => {
        if (task) {
            form.reset({
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                deadline: task.deadline ? new Date(task.deadline) : new Date(),
            });
        }
    }, [task, form]);

    const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
        setLoading(true);
        const taskData = {
            id: task?.id,
            ...data
        }
        startTransiton(() => {
            updateTask(taskData)
                .then((res) => {
                    if (res.success) {
                        toast({
                            variant: "success",
                            title: "Success",
                        });
                    } else if (res.error) {
                        toast({
                            variant: "destructive",
                            title: "Something went wrong",
                        });
                    }
                })
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Something went wrong",
                    });
                })
                .finally(() => {
                    location.reload();
                    handleClose();
                    setLoading(false);
                });
        });
    };

    const handleClose = useCallback(() => {
        form.reset();
        onClose();
    }, [form, onClose]);

    const getLabel = (value: string) => statusLabels[value as keyof typeof statusLabels] || "Select Status";

    let bodyContent = (
        <Form {...form}>
            <div className="flex w-full flex-col gap-2 mt-6 mb-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-transparent focus:ring-0"
                                    placeholder="Title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-transparent focus:ring-0"
                                    placeholder="Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DropdownInput
                                    label={getLabel(field.value)}
                                    onSelect={(value) => field.onChange(value)}
                                    menuItems={Object.keys(statusLabels)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DropdownInput
                                    label={field.value ? field.value : "Select Priority"}
                                    onSelect={(value) => field.onChange(value)}
                                    menuItems={['LOW', 'MEDIUM', 'URGENT']}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </Form>
    );

    return (
        <Modal
            type="sheet"
            title="Edit a task"
            description={"Edit task details"}
            onClose={handleClose}
            onSubmit={form.handleSubmit(onSubmit)}
            actionLabel={'Update'}
            secondaryAction={handleClose}
            secondaryActionLabel={'Cancel'}
            isOpen={isModalOpen}
            body={bodyContent}
            disabled={loading}
        />
    );
};

import * as z from "zod";

export const TaskSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().optional(),
    status: z.string().min(1, {
        message: "Status is required"
    }),
    priority: z.string().optional(),
    deadline: z.date().optional(),
})
import { z } from 'zod';

const taskSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().optional(),
    status: z.string().min(1, {
        message: "Status is required"
    }),
    priority: z.string().optional(),
    deadline: z.string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format for deadline"
        })
        .transform((val) => new Date(val))
        .optional(),
});

export const validateTask = (userData: any) => {
    const result = taskSchema.safeParse(userData);

    if (!result.success) {
        const errorMessages = result.error.errors.map(err => err.message);
        throw new Error(errorMessages.join(', '));
    }
    return result.data;
};
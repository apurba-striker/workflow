"use server"

import { getCurrentToken } from "@/lib/get-current-token";
import { getCurrentUser } from "@/lib/get-current-user"
import { TaskSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

export const createTask = async (values: z.infer<typeof TaskSchema>) => {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return {
                error: true,
                errorMessage: "User not found",
            }
        }

        const currentToken = await getCurrentToken();
        if(!currentToken){
            return {
                error: true,
                errorMessage: "Token not found",
            }
        }

        const validatedFields = TaskSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        }

        const data = validatedFields.data;

        const apiUrl = `${process.env.API_URL}/task`
        const response = await axios.post(apiUrl, data, {
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
        });

        return {
            success: true,
            data: response.data.data,
        };

    } catch(error: any) {
        return {
            error: true,
            errorMessage: error.message,
        }
    }
}
"use server"

import { getCurrentToken } from "@/lib/get-current-token";
import { getCurrentUser } from "@/lib/get-current-user"
import axios from "axios";

export const updateTask = async (values: any) => {
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

        const { id } = values;

        const apiUrl = `${process.env.API_URL}/task?taskId=${id}`
        const response = await axios.put(apiUrl, values, {
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
        });

        return {
            success: true,
        };

    } catch(error: any) {
        return {
            error: true,
            errorMessage: error.message,
        }
    }
}
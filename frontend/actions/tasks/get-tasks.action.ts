"use server"

import { getCurrentToken } from "@/lib/get-current-token";
import { getCurrentUser } from "@/lib/get-current-user"
import axios from "axios";


export const getTasks = async () => {
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

        const apiUrl = `${process.env.API_URL}/task`
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
        });

        return {
            success: true,
            tasks: response.data.data.tasks,
        };

    } catch(error: any) {
        return {
            error: true,
            errorMessage: error.message,
        }
    }
}
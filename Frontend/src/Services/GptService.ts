import axios from "axios";
import { GptResponse } from "../Models/GptResponse";

class GptService {

    public async getAiResponse(prompt: string): Promise<GptResponse> {

        // Send prompt to backend:
        const response = await axios.post<GptResponse>("http://localhost:4000/api/gpt", { prompt });

        // Return AI response:
        return response.data;
    }

}

export const gptService = new GptService();
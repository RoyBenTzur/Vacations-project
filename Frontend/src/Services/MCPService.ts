import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

// MCP service for communicating with backend.
class McpService {

    // Send user question to backend and get answer.
    public async askQuestion(question: string): Promise<string> {

        const response = await axios.post<string>(appConfig.mcpUrl, { question });

        return response.data;
    }

}

export const mcpService = new McpService();
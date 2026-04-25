import express, { NextFunction, Request, Response } from "express";
import { mcpService } from "../4-services/mcp-service";
import McpRequest from "../3-models/mcp-request";
import { StatusCode } from "../3-models/enums";

class McpController {

    public readonly router = express.Router();

    public constructor() {
        this.router.post("/mcp", this.askQuestion);
    }

    // Handle POST request and return answer string:
    private async askQuestion(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {

            // Create request model:
            const mcpRequest = new McpRequest(request.body);

            // Get response from service:
            const mcpResponse = await mcpService.askQuestion(mcpRequest.question);

            // Return only the answer string:
            response.status(StatusCode.OK).json(mcpResponse.answer);
        }
        catch (err: any) {
            next(err);
        }
    }

}

export const mcpController = new McpController();
import express, { NextFunction, Request, Response, Router } from "express";
import { StatusCode } from "../3-models/enums";
import { gptService } from "../4-services/gpt-service";

class GptController {

    public router: Router = express.Router();

    public constructor() {
        this.router.post("/gpt", this.getAiResponse);
    }

    // Handle AI request and return response
    private getAiResponse = async (request: Request, response: Response, next: NextFunction) => {
        try {
            console.log("GPT request arrived");
            // Extract prompt from request body:
            const prompt = request.body.prompt;

            // Get AI response:
            const aiResponse = await gptService.getAiResponse(prompt);

            // Return AI response:
            response.status(StatusCode.OK).json(aiResponse);
        }
        catch (err: any) {
            next(err);
        }
    };

}

export const gptController = new GptController();
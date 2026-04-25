import OpenAI from "openai";
import { appConfig } from "../2-utils/app-config";
import { promptService } from "./prompt";
import { GptResponse } from "../3-models/gpt-response";

class GptService {

    public async getAiResponse(prompt: string): Promise<GptResponse> {

        const openai = new OpenAI({
            apiKey: appConfig.openAiKey
        });

        const fullPrompt = promptService.buildPrompt(prompt);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: fullPrompt }
            ]
        });

        const answer = completion.choices[0].message.content || "";

        return new GptResponse(answer);
    }

}

export const gptService = new GptService();
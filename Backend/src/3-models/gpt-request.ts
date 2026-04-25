import Joi from "joi";
import { ValidationError } from "./client-errors";

export class GptRequest {

    public destination: string;

    public constructor(gptRequest: GptRequest) {
        this.destination = gptRequest.destination;
    }

    private static validationSchema = Joi.object({
        destination: Joi.string().required().min(2).max(100)
    });

    public validate(): void {
        const result = GptRequest.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}
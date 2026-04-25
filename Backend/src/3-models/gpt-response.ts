export class GptResponse {

    // The AI answer returned to the client:
    public answer: string;

    public constructor(answer: string) {
        this.answer = answer;
    }

}
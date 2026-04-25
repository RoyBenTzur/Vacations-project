import { useState } from "react";
import { gptService } from "../../../Services/GptService";
import "./Gpt.css";

function Gpt() {

    const [prompt, setPrompt] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function handleClick() {
        try {
            setLoading(true);
            const response = await gptService.getAiResponse(prompt);
            setAnswer(response.answer);
        }
        catch (err: any) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="Gpt">

            <h2>AI Recommendation</h2>

            <input
                type="text"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Ask anything about your trip..."
            />

            <button onClick={handleClick} disabled={loading}>
                {loading ? <span className="GptSpinner" /> : "Ask AI"}
            </button>

            <p>{answer}</p>

        </div>
    );
}

export default Gpt;

import { useState } from "react";
import "./MCP.css";
import { mcpService } from "../../../Services/MCPService";

// MCP page for asking questions about the database.
export function Mcp() {

    // State for the user question:
    const [question, setQuestion] = useState("");

    // State for the server answer:
    const [answer, setAnswer] = useState("");

    // Handle send button click:
    async function handleSend(): Promise<void> {
        try {
            const response = await mcpService.askQuestion(question);
            setAnswer(response);
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <div className="Mcp">

            <h2>MCP</h2>

            <p>Ask questions about the vacations database.</p>

            {/* Input for user question */}
            <input
                type="text"
                placeholder="Enter your question..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
            />

            {/* Send question button */}
            <button onClick={handleSend}>
                Send
            </button>

            {/* Display server answer */}
            <p>{answer}</p>

        </div>
    );
}
// Model for MCP response data.
class McpResponse {

    public answer: string;

    // Initialize MCP response object with answer text.
    public constructor(answer: string) {
        this.answer = answer;
    }

}

export default McpResponse;
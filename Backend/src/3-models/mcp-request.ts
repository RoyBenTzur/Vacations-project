// Model for MCP request data.
class McpRequest {

    public question: string;

    // Initialize MCP request object from incoming data.
    public constructor(mcpRequest: McpRequest) {
        this.question = mcpRequest.question;
    }

}

export default McpRequest;
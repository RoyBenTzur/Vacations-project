class AppConfig {

    public readonly vacationsUrl = "http://localhost:4000/api/vacations";
    public readonly likesUrl = "http://localhost:4000/api/likes";
    public readonly registerUrl = "http://localhost:4000/api/auth/register";
    public readonly loginUrl = "http://localhost:4000/api/auth/login";
    public mcpUrl = "http://localhost:4000/api/mcp";

}

export const appConfig = new AppConfig();
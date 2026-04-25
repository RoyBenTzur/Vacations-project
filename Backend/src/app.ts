import "dotenv/config";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { appConfig } from "./2-utils/app-config";
import { controller } from "./5-controllers/vacations-controller";
import { likesController } from "./5-controllers/likes-controller";
import { authController } from "./5-controllers/auth-controller";
import { gptController } from "./5-controllers/gpt-controller";
import { mcpController } from "./5-controllers/mcp-controller";
import { errorsMiddleware } from "./6-middleware/errors-middleware";

class App {

    public start(): void {
        try {
            const server = express();

            server.use(cors()); // Enable CORS
            server.use(express.json()); // Parse JSON request body
            server.use(fileUpload()); // Enable file upload
            server.use("/api/images", express.static(path.join(__dirname, "1-assets/images"))); // Serve images statically
            server.use("/api/videos", express.static(path.join(__dirname, "1-assets/videos"))); // Serve videos statically

            // Register controller routes:
            server.use(controller.router);
            server.use(likesController.router);
            server.use("/api/auth", authController.router);
            server.use("/api", gptController.router);
            server.use("/api", mcpController.router); // Register MCP routes

            server.use(errorsMiddleware.routeNotFound); // Handle route not found
            server.use(errorsMiddleware.catchAll); // Handle all errors

            server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port)); // Start server
        }
        catch (err: any) {
            console.error(err);
        }
    }
}

const app = new App();
app.start();
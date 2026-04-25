import express, { NextFunction, Request, Response, Router } from "express";
import { LikeModel } from "../3-models/like-model";
import { likesService } from "../4-services/likes-service";

// Controller for handling likes routes:
class LikesController {

    public router: Router = express.Router();

    // Register routes:
    public constructor() {
        this.router.post("/api/likes", this.addLike);
        this.router.delete("/api/likes", this.removeLike);
    }

    // Handle POST request and add a like:
    private async addLike(request: Request, response: Response, next: NextFunction) {
        try {
            const like = new LikeModel(request.body);
            await likesService.addLike(like);
            response.sendStatus(201);
        }
        catch (err: any) {
            next(err);
        }
    }

    // Handle DELETE request and remove a like:
    private async removeLike(request: Request, response: Response, next: NextFunction) {
        try {
            const like = new LikeModel(request.body);
            await likesService.removeLike(like);
            response.sendStatus(204);
        }
        catch (err: any) {
            next(err);
        }
    }

}

export const likesController = new LikesController();
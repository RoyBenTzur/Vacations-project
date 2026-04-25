import express, { NextFunction, Request, Response, Router } from "express";
import { promises as fsPromises } from "fs";
import { vacationsService } from "../4-services/vacations-service";
import { VacationModel } from "../3-models/vacations-model";

class Controller {

    public router: Router = express.Router();

    // Register routes:
    public constructor() {
        this.router.get("/api/vacations", this.getAllVacations);
        this.router.get("/api/vacations/:id", this.getOneVacation);
        this.router.post("/api/vacations", this.addVacation);
        this.router.put("/api/vacations/:id", this.updateVacation);
        this.router.delete("/api/vacations/:id", this.deleteVacation);
    }

    // Handle GET request and return all vacations:
    private async getAllVacations(request: Request, response: Response, next: NextFunction) {
        try {

            // Get current user id from query params (default 0 so SQL doesn't receive NaN):
            const userId = Number(request.query.userId) || 0;

            const vacations = await vacationsService.getAllVacations(userId);
            response.send(vacations);
        }
        catch (err: any) {
            next(err);
        }
    }

    // Handle GET request and return one vacation by id:
    private async getOneVacation(request: Request, response: Response, next: NextFunction) {
        try {

            // Extract id from route params:
            const id = +request.params.id;

            // Get one vacation from the service:
            const vacation = await vacationsService.getOneVacation(id);

            // Return the vacation to the client:
            response.send(vacation);
        }
        catch (err: any) {
            next(err);
        }
    }

    // Handle POST request and add a new vacation:
    private async addVacation(request: Request, response: Response, next: NextFunction) {
        try {
            // Get image from request:
            const image = request.files?.image as any;
            if (!image) throw new Error("Image is required");

            // Create unique file name and save image:
            const fileName = Date.now() + "-" + image.name;
            await image.mv("./src/1-assets/images/" + fileName);

            // Add image name to vacation:
            request.body.imageName = fileName;

            // Handle optional video upload:
            const video = request.files?.video as any;
            if (video) {
                const videoFileName = Date.now() + "-" + video.name;
                await video.mv("./src/1-assets/videos/" + videoFileName);
                request.body.videoName = videoFileName;
            }

            const vacation = new VacationModel(request.body);
            const addedVacation = await vacationsService.addVacation(vacation);
            response.status(201).json(addedVacation);
        }
        catch (err: any) {
            next(err);
        }
    }

    // Handle PUT request and update an existing vacation:
    private async updateVacation(request: Request, response: Response, next: NextFunction) {
        try {
            // Get id from params:
            request.body.id = +request.params.id;

            // Get image from request (optional):
            const image = request.files?.image as any;

            if (image) {
                // Create unique file name and save image:
                const fileName = Date.now() + "-" + image.name;
                await image.mv("./src/1-assets/images/" + fileName);

                // Update image name:
                request.body.imageName = fileName;
            }

            // Handle video: delete, replace, or no-change
            const video = request.files?.video as any;
            const deleteVideo = request.body.deleteVideo === "true" || request.body.deleteVideo === true;

            if (deleteVideo) {
                // Delete existing video file from disk:
                const current = await vacationsService.getOneVacation(+request.params.id);
                if (current.videoName) {
                    await fsPromises.unlink("./src/1-assets/videos/" + current.videoName).catch(() => {});
                }
                request.body.videoName = null;
            } else if (video) {
                // Delete old video file, then save new one:
                const current = await vacationsService.getOneVacation(+request.params.id);
                if (current.videoName) {
                    await fsPromises.unlink("./src/1-assets/videos/" + current.videoName).catch(() => {});
                }
                const videoFileName = Date.now() + "-" + video.name;
                await video.mv("./src/1-assets/videos/" + videoFileName);
                request.body.videoName = videoFileName;
            }
            // If neither: videoName stays undefined → service keeps existing value

            const vacation = new VacationModel(request.body);
            const updatedVacation = await vacationsService.updateVacation(vacation);
            response.json(updatedVacation);
        }
        catch (err: any) {
            next(err);
        }
    }

    // Handle DELETE request and delete vacation by id:
    private async deleteVacation(request: Request, response: Response, next: NextFunction) {
        try {

            // Extract id from route params:
            const id = +request.params.id;

            // Delete vacation in the service:
            await vacationsService.deleteVacation(id);

            // Return success status:
            response.sendStatus(204);
        }
        catch (err: any) {
            next(err);
        }
    }

}

export const controller = new Controller();
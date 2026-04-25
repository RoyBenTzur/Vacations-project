import Joi from "joi";

// Vacation model representing one vacation:
export class VacationModel {

    public id: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public videoName: string | null | undefined; // string = has video, null = explicitly deleted, undefined = no change
    public deleteVideo: boolean;                 // true = admin clicked "Delete Video"
    public likesCount: number;
    public isLiked: boolean;

    public constructor(vacation: any) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.videoName = vacation.videoName;  // preserve as-is: string | null | undefined
        this.deleteVideo = vacation.deleteVideo === true || vacation.deleteVideo === "true";
        this.likesCount = Number(vacation.likesCount) || 0;
        this.isLiked = Boolean(vacation.isLiked);
    }

    // Validation schema for adding a new vacation:
    private static postValidationSchema = Joi.object({
        id: Joi.number().optional(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(10000),
        startDate: Joi.date().iso().required().min("now"),
        endDate: Joi.date().iso().required().min(Joi.ref("startDate")),
        price: Joi.number().required().min(0).max(10000),
        imageName: Joi.string().required().min(1).max(255),
        videoName: Joi.string().optional().allow(null, "").max(255),
        deleteVideo: Joi.boolean().optional(),
        likesCount: Joi.number().optional(),
        isLiked: Joi.boolean().optional()
    });

    // Validation schema for updating an existing vacation:
    private static putValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(10000),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required().min(Joi.ref("startDate")),
        price: Joi.number().required().min(0).max(10000),
        imageName: Joi.string().required().min(1).max(255),
        videoName: Joi.any().optional(),   // string | null | undefined all valid at this stage
        deleteVideo: Joi.boolean().optional(),
        likesCount: Joi.number().optional(),
        isLiked: Joi.boolean().optional()
    });

    // Validates a vacation before adding it:
    public validatePost(): string {
        const result = VacationModel.postValidationSchema.validate(this);
        return result.error?.message || "";
    }

    // Validates a vacation before updating it:
    public validatePut(): string {
        const result = VacationModel.putValidationSchema.validate(this);
        return result.error?.message || "";
    }

}

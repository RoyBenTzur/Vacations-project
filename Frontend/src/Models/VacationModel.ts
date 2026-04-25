import Joi from "joi";

export class VacationModel {
    public id: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image?: File;
    public imageName: string;
    public video?: File;
    public videoName?: string | null;
    public likesCount: number;
    public isLiked: number;

    public constructor(vacation: any) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.video = vacation.video;
        this.videoName = vacation.videoName;
        this.likesCount = vacation.likesCount;
        this.isLiked = vacation.isLiked;
    }

    // Validation schema for adding vacation:
    private static postValidationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(10000),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().required(),
        imageName: Joi.string().optional().allow(""),
        video: Joi.object().optional(),
        videoName: Joi.string().optional().allow(null, ""),
        likesCount: Joi.number().optional(),
        isLiked: Joi.number().optional()
    });

    // Validation schema for updating vacation:
    private static putValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(10000),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().optional(),
        imageName: Joi.string().optional().allow(""),
        video: Joi.object().optional(),
        videoName: Joi.any().optional(),
        likesCount: Joi.number().optional(),
        isLiked: Joi.number().optional()
    });

    // Validate vacation for add:
    public validatePost(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if (result.error) throw new Error(result.error.message);

        if (new Date(this.endDate) < new Date(this.startDate)) {
            throw new Error("End date cannot be earlier than start date.");
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = new Date(this.startDate);
        startDate.setHours(0, 0, 0, 0);

        if (startDate < today) {
            throw new Error("Start date cannot be in the past.");
        }
    }

    // Validate vacation for update:
    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if (result.error) throw new Error(result.error.message);

        if (new Date(this.endDate) < new Date(this.startDate)) {
            throw new Error("End date cannot be earlier than start date.");
        }
    }
}
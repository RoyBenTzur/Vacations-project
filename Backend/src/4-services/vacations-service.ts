import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacations-model";

class VacationsService {

    // Get all vacations from the database
    public async getAllVacations(userId: number): Promise<VacationModel[]> {

        const sql = `
        SELECT
        vacations.id,
        vacations.destination,
        vacations.description,
        vacations.start_date AS startDate,
        vacations.end_date AS endDate,
        vacations.price,
        vacations.image_name AS imageName,
        vacations.video_name AS videoName,
        COUNT(likes.user_id) AS likesCount,
        IF(user_likes.user_id IS NOT NULL, true, false) AS isLiked
        FROM vacations
        LEFT JOIN likes
        ON vacations.id = likes.vacation_id
        LEFT JOIN likes AS user_likes
        ON vacations.id = user_likes.vacation_id
        AND user_likes.user_id = ?
        GROUP BY
        vacations.id,
        vacations.destination,
        vacations.description,
        vacations.start_date,
        vacations.end_date,
        vacations.price,
        vacations.image_name,
        vacations.video_name,
        user_likes.user_id
        ORDER BY vacations.start_date ASC`;

        const vacations = await dal.execute(sql, [userId]);
        return vacations as VacationModel[];
    }

    // Add a new vacation to the database
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        const error = vacation.validatePost();
        if (error) throw new Error(error);

        const sql = `
        INSERT INTO vacations (destination, description, start_date, end_date, price, image_name, video_name)
        VALUES(?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            vacation.imageName,
            vacation.videoName ?? null
        ];

        const result: any = await dal.execute(sql, values);
        vacation.id = result.insertId;
        return vacation;
    }

    // Update an existing vacation in the database
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

        // Keep current image if no new image was uploaded
        if (!vacation.imageName) {
            const currentVacation = await this.getOneVacation(vacation.id);
            vacation.imageName = currentVacation.imageName;
        }

        // Handle video: keep existing if no action was taken by the controller
        if (!vacation.deleteVideo && vacation.videoName === undefined) {
            const currentVacation = await this.getOneVacation(vacation.id);
            vacation.videoName = currentVacation.videoName ?? null;
        }
        // deleteVideo=true  → videoName is already null (set by controller) → DB gets NULL
        // videoName is a string → new filename from controller → DB gets that string

        const error = vacation.validatePut();
        if (error) throw new Error(error);

        const sql = `
        UPDATE vacations
        SET
        destination = ?,
        description = ?,
        start_date = ?,
        end_date = ?,
        price = ?,
        image_name = ?,
        video_name = ?
        WHERE id = ?
        `;

        const values = [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            vacation.imageName,
            vacation.videoName ?? null,
            vacation.id
        ];

        await dal.execute(sql, values);
        return vacation;
    }

    // Get one vacation by id
    public async getOneVacation(id: number): Promise<VacationModel> {

        const sql = `
        SELECT
        id,
        destination,
        description,
        start_date AS startDate,
        end_date AS endDate,
        price,
        image_name AS imageName,
        video_name AS videoName
        FROM vacations
        WHERE id = ?`;

        const vacations = await dal.execute(sql, [id]);
        const vacation = vacations[0] as VacationModel;
        return vacation;
    }

    // Delete vacation by id
    public async deleteVacation(id: number): Promise<void> {

        const sql = `
        DELETE FROM vacations
        WHERE id = ?`;

        await dal.execute(sql, [id]);
    }

}

export const vacationsService = new VacationsService();

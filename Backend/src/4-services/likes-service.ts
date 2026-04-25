import { dal } from "../2-utils/dal";
import { LikeModel } from "../3-models/like-model";

// Service for handling likes logic:
class LikesService {

    // Add a like:
    public async addLike(like: LikeModel): Promise<void> {
        // SQL query to insert a new like:
        const sql = `
        INSERT INTO likes (user_id, vacation_id)
        VALUES (?, ?)
        `;

        // Values for the query:
        const values = [like.userId, like.vacationId];

        // Execute the query:
        await dal.execute(sql, values);
    }

    // Remove a like:
    public async removeLike(like: LikeModel): Promise<void> {
        // SQL query to delete a like:
        const sql = `
        DELETE FROM likes
        WHERE user_id = ? AND vacation_id = ?
        `;

        // Values for the query:
        const values = [like.userId, like.vacationId];

        // Execute the query:
        await dal.execute(sql, values);
    }

}

export const likesService = new LikesService();
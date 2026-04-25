// Like model representing one like entity:
export class LikeModel {

    public userId: number;
    public vacationId: number;

    public constructor(like: any) {
        this.userId = like.userId;
        this.vacationId = like.vacationId;
    }
}
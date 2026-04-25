import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { VacationModel } from "../Models/VacationModel";

class Service {

    // Get all vacations from the server:
    public async getAllVacations(userId: number): Promise<VacationModel[]> {
        const response = await axios.get<any[]>(appConfig.vacationsUrl, {
            params: { userId }
        });

        const vacations = response.data.map(v => new VacationModel(v));
        return vacations;
    }

    // Add like for a vacation:
    public async addLike(userId: number, vacationId: number): Promise<void> {
        await axios.post(appConfig.likesUrl, { userId, vacationId });
    }

    // Remove like:
    public async removeLike(userId: number, vacationId: number): Promise<void> {
        await axios.delete(appConfig.likesUrl, { data: { userId, vacationId } });
    }

    // Delete vacation by id:
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(`${appConfig.vacationsUrl}/${vacationId}`);
    }

    // Get one vacation by id:
    public async getOneVacation(id: number): Promise<VacationModel> {
        const response = await axios.get(`${appConfig.vacationsUrl}/${id}`);
        return new VacationModel(response.data);
    }

    // Add vacation:
    public async addVacation(vacation: VacationModel, image: File, video?: File): Promise<void> {

        const formData = new FormData();

        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("price", vacation.price.toString());
        formData.append("image", image);

        if (video) {
            formData.append("video", video);
        }

        await axios.post(appConfig.vacationsUrl, formData);
    }

    // Update vacation:
    public async updateVacation(vacation: VacationModel, image?: File, video?: File, deleteVideo?: boolean): Promise<void> {

        const formData = new FormData();

        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("price", vacation.price.toString());

        if (image) {
            formData.append("image", image);
        }

        if (deleteVideo) {
            formData.append("deleteVideo", "true");
        } else if (video) {
            formData.append("video", video);
        }

        await axios.put(`${appConfig.vacationsUrl}/${vacation.id}`, formData);
    }

}

export const service = new Service();
import "./AddVacation.css"
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { service } from "../../../Services/Service";

export function AddVacation() {

    const navigate = useNavigate();

    const [vacation, setVacation] = useState<VacationModel>(new VacationModel({}));
    const [selectedImage, setSelectedImage] = useState<File | undefined>();
    const [imagePreview, setImagePreview] = useState<string>("");
    const [selectedVideo, setSelectedVideo] = useState<File | undefined>();
    const [videoPreview, setVideoPreview] = useState<string>("");
    const [error, setError] = useState<string>("");

    // Update text, date and number fields:
    function handleChange(args: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {

        const name = args.target.name;
        const rawValue = args.target.value;
        const value = name === "price" ? +rawValue : rawValue;

        const updatedVacation = new VacationModel(vacation);
        (updatedVacation as any)[name] = value;

        setVacation(updatedVacation);
    }

    // Update image:
    function handleImageChange(args: ChangeEvent<HTMLInputElement>): void {

        const image = args.target.files?.[0];
        if (!image) return;

        setSelectedImage(image);

        const updatedVacation = new VacationModel(vacation);
        updatedVacation.image = image;

        setVacation(updatedVacation);
        setImagePreview(URL.createObjectURL(image));
    }

    // Update video:
    function handleVideoChange(args: ChangeEvent<HTMLInputElement>): void {

        const video = args.target.files?.[0];
        if (!video) return;

        setSelectedVideo(video);
        setVideoPreview(URL.createObjectURL(video));
    }

    // Submit new vacation:
    function submit(args: FormEvent<HTMLFormElement>): void {
        args.preventDefault();

        try {

            if (!selectedImage) {
                setError("Image is required");
                return;
            }

            vacation.validatePost();

            service.addVacation(vacation, selectedImage, selectedVideo)
                .then(() => navigate("/vacations"))
                .catch(err => setError(err.message));

        }
        catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="AddVacation">

            <h2 className="AddVacationTitle">Add Vacation</h2>

            <form className="AddVacationForm" onSubmit={submit}>

                <label>Destination</label>
                <input
                    type="text"
                    name="destination"
                    onChange={handleChange}
                />

                <label>Description</label>
                <textarea
                    name="description"
                    onChange={handleChange}
                />

                <label>Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                />

                <label>End Date</label>
                <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                />

                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    min="0"
                    max="10000"
                    step="0.01"
                    onChange={handleChange}
                />

                <label>Image</label>

                {imagePreview && (
                    <img
                        src={imagePreview}
                        className="AddVacationImage"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <label>Video (optional)</label>

                {videoPreview && (
                    <video
                        src={videoPreview}
                        controls
                        className="AddVacationVideoPreview"
                    />
                )}

                <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                />

                {error && <span className="AddVacationError">{error}</span>}

                <button type="submit">Add Vacation</button>

            </form>

        </div>
    );
}
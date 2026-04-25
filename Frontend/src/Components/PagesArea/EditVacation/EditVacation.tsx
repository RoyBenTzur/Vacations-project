import "./EditVacation.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { service } from "../../../Services/Service";

export function EditVacation() {

    const params = useParams();
    const navigate = useNavigate();
    const id = +params.id!;

    const [vacation, setVacation] = useState<VacationModel | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | undefined>();
    const [imagePreview, setImagePreview] = useState<string>("");
    const [selectedVideo, setSelectedVideo] = useState<File | undefined>();
    const [videoPreview, setVideoPreview] = useState<string>("");
    const [deleteVideoFlag, setDeleteVideoFlag] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // Get vacation by id on component load:
    useEffect(() => {

        service.getOneVacation(id)
            .then(dbVacation => {
                dbVacation.startDate = dbVacation.startDate.split("T")[0];
                dbVacation.endDate = dbVacation.endDate.split("T")[0];
                setVacation(dbVacation);
                setImagePreview(`http://localhost:4000/api/images/${dbVacation.imageName}`);
                if (dbVacation.videoName) {
                    setVideoPreview(`http://localhost:4000/api/videos/${dbVacation.videoName}`);
                }
            })
            .catch(err => setError(err.message));

    }, [id]);

    // Update text, date and number fields:
    function handleChange(args: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {

        if (!vacation) return;

        const name = args.target.name;
        const rawValue = args.target.value;
        const value = name === "price" ? +rawValue : rawValue;

        const updatedVacation = new VacationModel(vacation);
        (updatedVacation as any)[name] = value;

        setVacation(updatedVacation);
    }

    // Update selected video:
    function handleVideoChange(args: ChangeEvent<HTMLInputElement>): void {

        const video = args.target.files?.[0];
        if (!video) return;

        setSelectedVideo(video);
        setDeleteVideoFlag(false);
        setVideoPreview(URL.createObjectURL(video));
    }

    // Delete existing video:
    function handleDeleteVideo(): void {
        setDeleteVideoFlag(true);
        setSelectedVideo(undefined);
        setVideoPreview("");
    }

    // Update selected image:
    function handleImageChange(args: ChangeEvent<HTMLInputElement>): void {

        if (!vacation) return;

        const image = args.target.files?.[0];
        if (!image) return;

        setSelectedImage(image);

        const updatedVacation = new VacationModel(vacation);
        updatedVacation.image = image;

        setVacation(updatedVacation);
        setImagePreview(URL.createObjectURL(image));
    }

    // Submit updated vacation:
    function submit(args: FormEvent<HTMLFormElement>): void {
        args.preventDefault();

        try {
            if (!vacation) return;

            vacation.validatePut();

            service.updateVacation(vacation, selectedImage, selectedVideo, deleteVideoFlag)
                .then(() => navigate("/vacations"))
                .catch(err => setError(err.message));
        }
        catch (err: any) {
            setError(err.message);
        }
    }

    if (!vacation) {
        return <div className="EditVacation">Loading...</div>;
    }

    return (
        <div className="EditVacation">

            <h2 className="EditVacationTitle">Edit Vacation</h2>

            <form className="EditVacationForm" onSubmit={submit}>

                <label>Destination</label>
                <input
                    type="text"
                    name="destination"
                    value={vacation.destination}
                    onChange={handleChange}
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={vacation.description}
                    onChange={handleChange}
                />

                <label>Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    value={vacation.startDate}
                    onChange={handleChange}
                />

                <label>End Date</label>
                <input
                    type="date"
                    name="endDate"
                    value={vacation.endDate}
                    onChange={handleChange}
                />

                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    min="0"
                    max="10000"
                    step="0.01"
                    value={vacation.price}
                    onChange={handleChange}
                />

                <label>Current / New Image</label>

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt={vacation.destination}
                        className="EditVacationImage"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <label>Video (optional)</label>

                {videoPreview && (
                    <div className="EditVacationVideoWrap">
                        <video
                            src={videoPreview}
                            controls
                            className="EditVacationVideoPreview"
                        />
                        <button
                            type="button"
                            className="EditVacationDeleteVideoBtn"
                            onClick={handleDeleteVideo}
                        >
                            Delete Video
                        </button>
                    </div>
                )}

                {!videoPreview && (
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                    />
                )}

                {deleteVideoFlag && (
                    <span className="EditVacationVideoDeleteNote">Video will be removed on save.</span>
                )}

                {error && <span className="EditVacationError">{error}</span>}

                <button type="submit">Update Vacation</button>

            </form>

        </div>
    );
}
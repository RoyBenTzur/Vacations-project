import { useEffect, MouseEvent } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationModal.css";

type VacationModalProps = {
    vacation: VacationModel;
    isAdmin: boolean;
    toggleLike: (vacation: VacationModel) => void;
    onEdit: (vacation: VacationModel) => void;
    onDelete: (vacation: VacationModel) => void;
    onClose: () => void;
    formatDate: (date: string) => string;
};

export function VacationModal(props: VacationModalProps) {

    const { vacation, isAdmin, toggleLike, onEdit, onDelete, onClose, formatDate } = props;

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    function handleOverlayClick(e: MouseEvent<HTMLDivElement>): void {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <div className="VacationModalOverlay" onClick={handleOverlayClick}>
            <div className="VacationModal" role="dialog" aria-modal="true">

                <button className="VacationModalClose" onClick={onClose} aria-label="Close">
                    &#x2715;
                </button>

                <div className="VacationModalImageWrap">
                    <img
                        src={`http://localhost:4000/api/images/${vacation.imageName}`}
                        alt={vacation.destination}
                        className="VacationModalImg"
                    />
                    <div className="VacationModalImgOverlay" />
                </div>

                <div className="VacationModalBody">

                    <h2 className="VacationModalTitle">{vacation.destination}</h2>

                    <p className="VacationModalDescription">{vacation.description}</p>

                    {vacation.videoName && (
                        <div className="VacationModalVideoWrap">
                            <span className="VacationModalVideoLabel">Destination Preview</span>
                            <video
                                src={`http://localhost:4000/api/videos/${vacation.videoName}`}
                                controls
                                className="VacationModalVideo"
                            />
                        </div>
                    )}

                    <div className="VacationModalMeta">
                        <div className="VacationModalMetaItem">
                            <span className="VacationModalMetaLabel">Start Date</span>
                            <span className="VacationModalMetaValue">{formatDate(vacation.startDate)}</span>
                        </div>
                        <div className="VacationModalMetaItem">
                            <span className="VacationModalMetaLabel">End Date</span>
                            <span className="VacationModalMetaValue">{formatDate(vacation.endDate)}</span>
                        </div>
                        <div className="VacationModalMetaItem">
                            <span className="VacationModalMetaLabel">Price</span>
                            <span className="VacationModalMetaValue">${vacation.price}</span>
                        </div>
                        <div className="VacationModalMetaItem">
                            <span className="VacationModalMetaLabel">Likes</span>
                            <span className="VacationModalMetaValue VacationModalLikesCount">&#9829; {vacation.likesCount}</span>
                        </div>
                    </div>

                    <div className="VacationModalActions">
                        {!isAdmin && (
                            <button
                                className={`VacationModalLikeBtn${vacation.isLiked ? " VacationModalLiked" : ""}`}
                                onClick={() => toggleLike(vacation)}
                            >
                                {vacation.isLiked ? "♥ Unlike" : "♡ Like"}
                            </button>
                        )}
                        {isAdmin && (
                            <>
                                <button className="VacationModalEditBtn" onClick={() => onEdit(vacation)}>
                                    Edit
                                </button>
                                <button className="VacationModalDeleteBtn" onClick={() => onDelete(vacation)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

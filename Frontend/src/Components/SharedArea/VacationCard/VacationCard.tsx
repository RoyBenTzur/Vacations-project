import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";

// Props for VacationCard component
type VacationCardProps = {
    vacation: VacationModel;
    toggleLike: (vacation: VacationModel) => void;
    formatDate: (date: string) => string;
    isAdmin: boolean;
    onEdit: (vacation: VacationModel) => void;
    onDelete: (vacation: VacationModel) => void;
};

export function VacationCard(props: VacationCardProps) {

    const { vacation, toggleLike, formatDate, isAdmin, onEdit, onDelete } = props;

    return (
        <div className="VacationCard">

            <div className="ImageContainer">

                <img
                    src={`http://localhost:4000/api/images/${vacation.imageName}`}
                    alt={vacation.destination}
                    className="VacationImage"
                />

                {/* Like button (user only) */}
                {!isAdmin && (
                    <div
                        className={`LikesBadge ${vacation.isLiked ? "Liked" : ""}`}
                        onClick={() => toggleLike(vacation)}
                    >
                        <span>♥</span>
                        <span>{vacation.likesCount}</span>
                    </div>
                )}

                {/* Admin buttons on image */}
                {isAdmin && (
                    <div className="AdminBadge">
                        <button onClick={() => onEdit(vacation)}>Edit</button>
                        <button onClick={() => onDelete(vacation)}>Delete</button>
                    </div>
                )}

                {/* Vacation title on image */}
                <div className="VacationTitle">
                    <h3>{vacation.destination}</h3>
                </div>

            </div>

            <div className="VacationContent">

                <p>{vacation.description}</p>

                <p>
                    <strong>Start Date:</strong> {formatDate(vacation.startDate)}
                </p>

                <p>
                    <strong>End Date:</strong> {formatDate(vacation.endDate)}
                </p>

                <p>
                    <strong>Price:</strong> ${vacation.price}
                </p>

            </div>

        </div>
    );
}
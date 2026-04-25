import { useEffect, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { service } from "../../../Services/Service";
import "./Vacations.css";
import { VacationCard } from "../../SharedArea/VacationCard/VacationCard";
import { VacationModal } from "../../SharedArea/VacationModal/VacationModal";
import { AppState } from "../../../Redux/AppState";

export function Vacations() {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterBy, setFilterBy] = useState<string>("all");
    const [selectedVacation, setSelectedVacation] = useState<VacationModel | null>(null);
    const user = useSelector((state: AppState) => state.auth.user);

    const navigate = useNavigate();

    const vacationsPerPage = 9;

    useEffect(() => {

        if (!user) return;

        service.getAllVacations(user.id)
            .then(vacations => {
                vacations.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                setVacations(vacations);
            })
            .catch(err => console.log(err));

    }, [user]);

    function formatDate(date: string): string {
        return new Date(date).toLocaleDateString("en-US");
    }

    function toggleLike(vacation: VacationModel): void {

        if (!user) return;

        const userId = user.id;

        if (vacation.isLiked === 0) {
            service.addLike(userId, vacation.id)
                .then(() => {
                    vacation.isLiked = 1;
                    vacation.likesCount++;
                    setVacations([...vacations]);
                })
                .catch(err => console.log(err));
        }

        else {
            service.removeLike(userId, vacation.id)
                .then(() => {
                    vacation.isLiked = 0;
                    vacation.likesCount--;
                    setVacations([...vacations]);
                })
                .catch(err => console.log(err));
        }
    }

    function addVacation(): void {
        navigate("/vacations/new");
    }

    function editVacation(vacation: VacationModel): void {
        navigate(`/vacations/edit/${vacation.id}`);
    }

    function deleteVacation(vacation: VacationModel): void {

        const isConfirmed = window.confirm("Are you sure you want to delete this vacation?");
        if (!isConfirmed) return;

        service.deleteVacation(vacation.id)
            .then(() => {
                setVacations(vacations.filter(v => v.id !== vacation.id));
                setSelectedVacation(null);
            })
            .catch(err => console.log(err));
    }

    function getFilteredVacations(): VacationModel[] {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (filterBy === "liked") {
            return vacations.filter(v => v.isLiked === 1);
        }

        if (filterBy === "active") {
            return vacations.filter(v => {
                const startDate = new Date(v.startDate);
                const endDate = new Date(v.endDate);

                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);

                return startDate <= today && endDate >= today;
            });
        }

        if (filterBy === "not-started") {
            return vacations.filter(v => {
                const startDate = new Date(v.startDate);
                startDate.setHours(0, 0, 0, 0);

                return startDate > today;
            });
        }

        return vacations;
    }

    // Open modal only when clicking the card body — not buttons or the like badge
    function handleCardClick(e: MouseEvent<HTMLDivElement>, vacation: VacationModel): void {
        const target = e.target as HTMLElement;
        if (target.closest("button") || target.closest(".LikesBadge")) return;
        setSelectedVacation(vacation);
    }

    const filteredVacations = getFilteredVacations();
    const pagesCount = Math.ceil(filteredVacations.length / vacationsPerPage);
    const startIndex = (currentPage - 1) * vacationsPerPage;
    const endIndex = startIndex + vacationsPerPage;
    const displayedVacations = filteredVacations.slice(startIndex, endIndex);

    return (
        <div className="Vacations">

            {user && user.roleId === 1 && (
                <div className="AddButton">
                    <button onClick={addVacation}>Add Vacation</button>
                </div>
            )}

            {user && user.roleId !== 1 && (
                <div className="Filters">
                    <button onClick={() => { setFilterBy("all"); setCurrentPage(1); }}>
                        All
                    </button>

                    <button onClick={() => { setFilterBy("liked"); setCurrentPage(1); }}>
                        Liked
                    </button>

                    <button onClick={() => { setFilterBy("active"); setCurrentPage(1); }}>
                        Active
                    </button>

                    <button onClick={() => { setFilterBy("not-started"); setCurrentPage(1); }}>
                        Not Started Yet
                    </button>
                </div>
            )}

            {displayedVacations.map(vacation =>
                <div
                    key={vacation.id}
                    className="VacationCardWrapper"
                    onClick={(e) => handleCardClick(e, vacation)}
                >
                    <VacationCard
                        vacation={vacation}
                        toggleLike={toggleLike}
                        formatDate={formatDate}
                        isAdmin={user?.roleId === 1}
                        onEdit={editVacation}
                        onDelete={deleteVacation}
                    />
                </div>
            )}

            <div className="Pagination">
                {[...Array(pagesCount)].map((_, index) =>
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                )}
            </div>

            {selectedVacation && (
                <VacationModal
                    vacation={selectedVacation}
                    isAdmin={user?.roleId === 1}
                    toggleLike={toggleLike}
                    onEdit={editVacation}
                    onDelete={deleteVacation}
                    onClose={() => setSelectedVacation(null)}
                    formatDate={formatDate}
                />
            )}

        </div>
    );
}

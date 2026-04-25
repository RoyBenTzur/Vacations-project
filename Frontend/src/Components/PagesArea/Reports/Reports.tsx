import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import { service } from "../../../Services/Service";
import "./Reports.css";

export function Reports() {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        service.getAllVacations(0)
            .then(v => setVacations(v))
            .catch(err => console.log(err));
    }, []);

    function downloadCsv(): void {

        let csv = "Destination,Likes\n";

        for (const v of vacations) {
            csv += `${v.destination},${v.likesCount}\n`;
        }

        const blob = new Blob([csv], { type: "text/csv" });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "vacations-report.csv";
        a.click();

        window.URL.revokeObjectURL(url);
    }

    const maxLikes = Math.max(...vacations.map(v => v.likesCount), 1);

    return (
        <div className="Reports">

            <button onClick={downloadCsv}>
                Download CSV
            </button>

            <div className="Chart">

                <div className="YAxis">
                    {Array.from({ length: maxLikes + 1 }).map((_, i) => (
                        <div key={i}>{maxLikes - i}</div>
                    ))}
                </div>

                <div className="Bars">
                    {vacations.map(v => (
                        <div key={v.id} className="BarItem">

                            <div
                                className="Bar"
                                style={{
                                    height: (v.likesCount / maxLikes) * 200 + "px"
                                }}
                            />

                            <span className="BarLabel">
                                {v.destination}
                            </span>

                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}
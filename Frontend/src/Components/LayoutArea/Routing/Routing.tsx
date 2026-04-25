import { Navigate, Route, Routes } from "react-router-dom";
import { Vacations } from "../../PagesArea/Vacations/Vacations";
import { Page404 } from "../../PagesArea/Page404/Page404";
import Login from "../../PagesArea/Login/Login";
import Logout from "../../PagesArea/Logout/Logout";
import Register from "../../PagesArea/Register/Register";
import { UserRoute } from "./UserRoute";
import Gpt from "../../PagesArea/Gpt/Gpt";
import { Mcp } from "../../../Components/PagesArea/MCP/MCP";
import { AdminRoute } from "./AdminRoute";
import { Reports } from "../../PagesArea/Reports/Reports";
import { AddVacation } from "../../PagesArea/AddVacation/AddVacation";
import { EditVacation } from "../../PagesArea/EditVacation/EditVacation";
import { About } from "../../PagesArea/About/About";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/vacations" />} />
            <Route path="/vacations" element={<UserRoute element={<Vacations />} />} />
            <Route path="/gpt" element={<UserRoute element={<Gpt />} />} />
            <Route path="/mcp" element={<UserRoute element={<Mcp />} />} />
            <Route path="/about" element={<UserRoute element={<About />} />} />
            <Route path="/reports" element={<AdminRoute element={<Reports />} />} />
            <Route path="/vacations/new" element={<AdminRoute element={<AddVacation />} />} />
            <Route path="/vacations/edit/:id" element={<AdminRoute element={<EditVacation />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
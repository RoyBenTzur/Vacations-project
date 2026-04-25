import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import "./Menu.css";

export function Menu() {

    const user = useSelector((state: AppState) => state.auth.user);
    const location = useLocation();

    return (
        <div className="Menu">

            {/* Left side - system links (only when logged-in) */}
            {user && (
                <div className="Links">

                    <NavLink to="/vacations">Vacations</NavLink>

                    {user.roleId === 2 && (
                        <>
                            <NavLink to="/gpt">AI Recommendation</NavLink>
                            <NavLink to="/mcp">MCP</NavLink>
                            <NavLink to="/about">About</NavLink>
                        </>
                    )}

                    {user.roleId === 1 && (
                        <NavLink to="/reports">Reports</NavLink>
                    )}

                </div>
            )}

            {/* Right side - auth / user area */}
            <div className="UserArea">

                {/* Guest mode */}
                {!user && location.pathname === "/login" && (
                    <NavLink to="/register">Register</NavLink>
                )}

                {!user && location.pathname === "/register" && (
                    <NavLink to="/login">Login</NavLink>
                )}

                {/* Logged-in mode */}
                {user && (
                    <>
                        <span>Hello {user.firstName} {user.lastName}</span>
                        <NavLink to="/logout">Logout</NavLink>
                    </>
                )}

            </div>

        </div>
    );
}
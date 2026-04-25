import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

// Route guard for admin users only.
type AdminRouteProps = {
    element: any;
};

export function AdminRoute(props: AdminRouteProps) {

    const user = useSelector((state: AppState) => state.auth.user);

    // Not logged-in:
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Not admin:
    if (user.roleId !== 1) {
        return <Navigate to="/vacations" />;
    }

    return props.element;
}
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

// Route guard for logged-in users only.
type UserRouteProps = {
    element: any;
};

export function UserRoute(props: UserRouteProps) {

    const user = useSelector((state: AppState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return props.element;
}
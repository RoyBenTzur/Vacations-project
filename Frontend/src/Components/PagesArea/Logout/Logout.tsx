import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authService } from "../../../Services/AuthService";
import { authActions } from "../../../Redux/AuthSlice";

// Logout the current user and redirect to login:

function Logout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        authService.logout();
        dispatch(authActions.logout());
        navigate("/login");
    }, [dispatch, navigate]);

    return null;
}

export default Logout;
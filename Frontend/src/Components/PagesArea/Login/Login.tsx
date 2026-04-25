import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authService } from "../../../Services/AuthService";
import { authActions } from "../../../Redux/AuthSlice";

// Login page for registered users:

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Send login request to the server:
    async function send(): Promise<void> {
        try {
            const user = await authService.login(email, password);
            dispatch(authActions.login({ ...user }));
            navigate("/vacations");
        }
        catch (err: any) {

            // If unauthorized - wrong email or password:
            if (err.response?.status === 401) {
                alert("Email or password is incorrect.");
            }
            else {
                alert("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="Login">
            <h2>Login</h2>

            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={args => setEmail(args.target.value)}
            />

            <br /><br />

            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={args => setPassword(args.target.value)}
            />

            <br /><br />

            <button onClick={send}>Login</button>
        </div>
    );
}

export default Login;
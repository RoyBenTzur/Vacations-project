import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../Services/AuthService";

// Register page for new users:

function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Send register request to the server:
    async function send(): Promise<void> {
        try {
            await authService.register(firstName, lastName, email, password);
            alert("Registration completed successfully.");
            navigate("/login");
        }
        catch (err: any) {

            // Show validation or server error message:
            if (typeof err.response?.data === "string") {
                alert(err.response.data);
            }
            else {
                alert("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="Register">
            <h2>Register</h2>

            <label>First Name:</label>
            <input
                type="text"
                value={firstName}
                onChange={args => setFirstName(args.target.value)}
            />

            <br /><br />

            <label>Last Name:</label>
            <input
                type="text"
                value={lastName}
                onChange={args => setLastName(args.target.value)}
            />

            <br /><br />

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

            <button onClick={send}>Register</button>
        </div>
    );
}

export default Register;
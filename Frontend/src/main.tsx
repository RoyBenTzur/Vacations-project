import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "./Components/LayoutArea/Layout/Layout";
import { store } from "./Redux/Store";
import "./index.css";

// Redirect bare root visits to the base path so the router can match.
if (!window.location.pathname.startsWith("/imaginary-vacation")) {
    window.location.replace("/imaginary-vacation/");
} else {
    createRoot(document.getElementById("root")!).render(
        <Provider store={store}>
            <BrowserRouter basename="/imaginary-vacation">
                <Layout />
            </BrowserRouter>
        </Provider>
    );
}
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import FormContextProvider from "./context/FormContext.tsx";
import UserContextProvider from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserContextProvider>
            <FormContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </FormContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);

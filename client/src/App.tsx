import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import Footer from "./components/Footer";

function App() {
    useEffect(() => {
        themeChange(false);
        return () => {
            themeChange(false);
        };
    }, []);
    return (
        <>
            <main>
                <Toaster />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;

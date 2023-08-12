import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import Footer from "./components/Footer";
import Administration from "./pages/Administration";

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
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/administration"
                        element={<Administration />}
                    />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;

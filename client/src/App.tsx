import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import Footer from "./components/Footer";
import Administration from "./pages/Administration";
import RequireAuth from "./components/RequrieAuth";
import Unauthorized from "./pages/Unauthorized";

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* Rotues that require auth */}
                    <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                        <Route
                            path="/administration"
                            element={<Administration />}
                        />
                    </Route>

                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={["Admin", "DAM", "SJ"]}
                            />
                        }
                    >
                        <Route path="/" element={<Home />} />
                    </Route>

                    {/* Non-existant route */}
                    <Route path="*" element={<div></div>} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;

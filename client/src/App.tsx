import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import Footer from "./components/Footer";
import Administration from "./pages/Administration";
import RequireAuth from "./components/RequireAuth";
import Cases from "./pages/Cases";
import NotFound from "./pages/NotFound";
import Requests from "./pages/Requests";
import RateUs from "./components/modals/RateUs";

function App() {
    const [showRatingModal, setShowRatingModal] = useState(false);
    const { pathname } = useLocation();

    // theme color swap
    useEffect(() => {
        themeChange(false);
        return () => {
            themeChange(false);
        };
    }, []);

    return (
        <>
            <main>
                {/* Toaster */}
                <Toaster />

                {/* Rate us modal */}
                <RateUs
                    isOpen={showRatingModal}
                    close={() => setShowRatingModal(false)}
                />

                {/* Navbar */}
                {pathname !== "/login" ? (
                    <Navbar openRatingModal={() => setShowRatingModal(true)} />
                ) : null}

                <Routes>
                    {/* No auth required routes */}

                    <Route path="/login" element={<Login />} />

                    {/* Auth required routes */}
                    <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                        <Route
                            path="/administration"
                            element={<Administration />}
                        />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["SJ"]} />}>
                        <Route path="/cases" element={<Cases />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["DAM"]} />}>
                        <Route path="/requests" element={<Requests />} />
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

                    {/* Not found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            {/* Footer */}
            {pathname === "/" ? <Footer /> : null}
        </>
    );
}

export default App;

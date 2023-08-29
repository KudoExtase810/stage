import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import Footer from "./components/Footer";
import Administration from "./pages/Administration";
import RequireAuth from "./components/RequireAuth";
import Cases from "./pages/Cases";
import NotFound from "./pages/NotFound";

function App() {
    const { pathname } = useLocation();
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

                {pathname !== "/login" ? <Navbar /> : null}

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

                    <Route
                        element={<RequireAuth allowedRoles={["SJ", "DAM"]} />}
                    >
                        <Route path="/cases" element={<Cases />} />
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
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            {pathname === "/" ? <Footer /> : null}
        </>
    );
}

export default App;

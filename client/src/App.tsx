import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

function App() {
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
        </>
    );
}

export default App;

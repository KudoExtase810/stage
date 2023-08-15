import { useLocation } from "react-router-dom";

const Footer = () => {
    const { pathname } = useLocation();
    if (pathname !== "/") return null;
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <p>
                Copyright © 2023 - All right reserved by Bob & Griffith Academy
            </p>
        </footer>
    );
};

export default Footer;

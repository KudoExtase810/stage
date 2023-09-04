import { Link } from "react-router-dom";
import goku from "../../assets/goku.webp";
import { useAuth } from "../../context/UserContext";

const Hero = () => {
    const { userData } = useAuth();
    // Generate appropriate greetings message based on time
    const greetBasedOnTime = () => {
        const currentHour = new Date().getHours();
        return currentHour >= 5 && currentHour <= 18 ? "Bonjour" : "Bonsoir";
    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={goku}
                    className="max-w-sm rounded-lg shadow-2xl"
                    alt="goku"
                />
                <div>
                    <h1 className="text-5xl font-bold">
                        {greetBasedOnTime()}, {userData?.username}
                    </h1>
                    <p className="py-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nostrum exercitationem nesciunt cupiditate officiis
                        voluptatibus quos culpa voluptatem dolor voluptates.
                        Voluptate!
                    </p>
                    {userData?.role === "Admin" ? (
                        <Link to="/administration" className="btn btn-primary">
                            Panneau d'administration
                        </Link>
                    ) : userData?.role === "DAM" ? (
                        <Link to="/requests" className="btn btn-primary">
                            Gérer les demandes
                        </Link>
                    ) : (
                        <Link to="/cases" className="btn btn-primary">
                            Gérer les affaires
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;

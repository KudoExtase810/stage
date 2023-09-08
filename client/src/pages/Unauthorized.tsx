import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <main className="text-center h-screen flex flex-col justify-center">
            <h2 className="font-semibold text-5xl text-red-600 lg:text-6xl">
                Accès non autorisé
            </h2>
            <div className="bg-accent-content h-[2px] w-[250px] mx-auto my-6"></div>
            <p className="text-xl mb-6">
                🚫🚫 Oups, il semble que vous n'avez pas accès à cette page 🚫🚫
            </p>
            <Link
                rel="noopener noreferrer"
                to="/"
                className=" btn btn-primary mx-auto px-10"
            >
                Acceuil
            </Link>
        </main>
    );
}

export default Unauthorized;

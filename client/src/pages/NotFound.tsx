import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen overflow-hidden bg-gradient-to-r from-primary to-accent">
            <div className="p-24 bg-white rounded-md shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-accent-focus text-9xl">
                        404
                    </h1>

                    <h3 className="my-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-red-500">Oups !</span> Page non
                        trouvée
                    </h3>

                    <p className="mb-8 mt-3 text-center text-gray-500 md:text-lg">
                        La page que vous cherchez n'existe pas.
                    </p>

                    <Link
                        to="/"
                        className="btn btn-accent"
                        rel="noopener noreferrer"
                    >
                        Accueil
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

import noResultsImg from "../assets/images/no-results.png";
const NoResults = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-10 text-center py-16 px-4">
            <img
                src={noResultsImg}
                alt="Aucun résultat"
                width={280}
                height={280}
            />
            <h3 className="text- font-bold text-2xl">Aucun résultat trouvé</h3>
            <p className="text-gray-500 text-xl">
                Aucun résultat ne correspond à vos critères de recherche
            </p>
        </div>
    );
};

export default NoResults;

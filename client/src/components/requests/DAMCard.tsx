interface props {
    request: DAMRequest;
    openDAMModal: () => void;
    setDAMReqDetails: React.Dispatch<React.SetStateAction<DAMRequest | null>>;
}

const DAMCard = ({ request, openDAMModal, setDAMReqDetails }: props) => {
    const { caseNumber, place, service, updatedAt } = request;
    return (
        <li className="card w-96 bg-zinc-300 text-zinc-900">
            <div className="card-body">
                <h2 className="card-title">#{caseNumber}</h2>
                <ul>
                    <li>Service: {service}</li>
                    <li>Place: {place}</li>
                    <li>Dernière modif: {updatedAt}</li>
                </ul>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-accent"
                        onClick={() => {
                            openDAMModal();
                            setDAMReqDetails(request);
                        }}
                    >
                        Voir plus
                    </button>
                </div>
            </div>
        </li>
    );
};

export default DAMCard;

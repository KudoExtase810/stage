import { Details } from "../../pages/Cases";

interface props {
    request: DAMRequest;
    openDetailsModal: () => void;
    setFullCardDetails: React.Dispatch<React.SetStateAction<Details | null>>;
}

const DAMCard = ({ request, openDetailsModal, setFullCardDetails }: props) => {
    const { caseNumber, place, service, updatedAt } = request;
    return (
        <li className="card w-96 bg-primary text-primary-content">
            <div className="card-body">
                <h2 className="card-title">#{caseNumber}</h2>
                <ul>
                    <li>Service: {service}</li>
                    <li>Place: {place}</li>
                    <li>Dernière modif: {updatedAt}</li>
                </ul>
                <div className="card-actions justify-end">
                    <button
                        className="btn"
                        onClick={() => {
                            openDetailsModal();
                            setFullCardDetails(request);
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

import { Details } from "../../pages/Cases";

interface props {
    _case: SJCase;
    openDetailsModal: () => void;
    setFullCardDetails: React.Dispatch<React.SetStateAction<Details | null>>;
}

const SJCard = ({ _case, openDetailsModal, setFullCardDetails }: props) => {
    return (
        <li className="card w-96 bg-primary text-primary-content card-compact-">
            {/* //! look classes above */}

            <div className="card-body">
                <h2 className="card-title">
                    #{Math.ceil(Math.random() * 100000)}{" "}
                    <span className="text-sm">(Par: Mahmoud Ramdan)</span>
                </h2>
                <div>
                    <ul>
                        <li>Sujet: Lorem ipsum</li>
                        <li>Huissier: Mohamed Ben-Ali</li>
                    </ul>
                </div>
                <div className="card-actions justify-end">
                    <button
                        className="btn"
                        onClick={() => {
                            openDetailsModal();
                        }}
                    >
                        Voir plus
                    </button>
                </div>
            </div>
        </li>
    );
};

export default SJCard;

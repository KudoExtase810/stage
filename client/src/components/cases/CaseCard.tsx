import { Details } from "../../pages/Cases";
import { BiSolidLockOpen, BiSolidLock } from "react-icons/bi";
import { formatDate } from "../../utils/DateFormatter";

interface props {
    fullCase: FullCase;
    openDetailsModal: () => void;
    setFullCardDetails: React.Dispatch<React.SetStateAction<Details | null>>;
}

const CaseCard = ({
    fullCase,
    openDetailsModal,
    setFullCardDetails,
}: props) => {
    return (
        <li className="card w-96 bg-primary text-primary-content card-compact-">
            {/* //! look classes above */}

            <div className="card-body">
                <div className="flex justify-between items-center gap-3">
                    <progress
                        className="progress progress-accent bg-gray-400"
                        value={(fullCase.progress / 3) * 100}
                        max={100}
                    />

                    <button>
                        {fullCase.status === "locked" ? (
                            <BiSolidLock size={22} />
                        ) : (
                            <BiSolidLockOpen size={22} />
                        )}
                    </button>
                </div>
                <div>
                    <ul>
                        <li>Établie par: {fullCase.requestedBy.username}</li>
                        <li>
                            Traitée par:{" "}
                            {fullCase.handledBy?.username ||
                                "Pas encore traitée."}
                        </li>
                        <li>Créée le: {formatDate(fullCase.createdAt)}</li>
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

export default CaseCard;

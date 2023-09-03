import { BiSolidLockOpen, BiSolidLock } from "react-icons/bi";
import { formatDate } from "../../utils/DateFormatter";

interface props {
    fullCase: FullCase;
    setFullCaseDetails: React.Dispatch<React.SetStateAction<FullCase | null>>;
    openFullCaseModal: () => void;
}

const CaseCard = ({
    fullCase,
    openFullCaseModal,
    setFullCaseDetails,
}: props) => {
    return (
        <li className="card w-96 bg-gray-200 hover:bg-zinc-300 text-zinc-900 card-compact-">
            {/* //! look classes above */}

            <div className="card-body">
                <div className="flex justify-between items-center gap-3">
                    <progress
                        className="progress progress-accent bg-gray-400"
                        value={(fullCase.progress / 3) * 100}
                        max={100}
                    />

                    <div className="tooltip" data-tip="Archiver">
                        <button>
                            {fullCase.isArchived ? (
                                <BiSolidLock size={22} />
                            ) : (
                                <BiSolidLockOpen size={22} />
                            )}
                        </button>
                    </div>
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
                        {/* <li>Complétée le: {formatDate(fullCase.completedAt)}</li> */}
                    </ul>
                </div>
                <div className="card-actions justify-end">
                    <button
                        className="btn"
                        onClick={() => {
                            setFullCaseDetails(fullCase);
                            openFullCaseModal();
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

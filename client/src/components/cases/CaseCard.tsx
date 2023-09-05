import { BiSolidLockOpen, BiSolidLock } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { formatDate } from "../../utils/DateFormatter";
import { toast } from "react-hot-toast";

interface props {
    fullCase: FullCase;
    setFullCaseDetails: React.Dispatch<React.SetStateAction<FullCase | null>>;
    openFullCaseModal: () => void;
    openArchiveCaseModal: () => void;
    openDAMModal: () => void;
}

const CaseCard = ({
    fullCase,
    openFullCaseModal,
    openArchiveCaseModal,
    setFullCaseDetails,
    openDAMModal,
}: props) => {
    const {
        _id,
        progress,
        isArchived,
        requestedBy,
        handledBy,
        createdAt,
        completedAt,
    } = fullCase;

    return (
        <li className="card w-96 bg-zinc-300 text-zinc-900">
            <div className="card-body">
                <div className="flex justify-between items-center gap-3">
                    <progress
                        className="progress progress-accent bg-gray-400"
                        value={(progress / 3) * 100}
                        max={100}
                    />

                    <div
                        className={`tooltip ${
                            isArchived ? "tooltip-info" : "tooltip-warning"
                        }`}
                        data-tip={isArchived ? "Archivée" : "Archiver"}
                    >
                        <button
                            onClick={() => {
                                if (isArchived)
                                    return toast.error(
                                        "Cette affaire est deja archivée."
                                    );
                                setFullCaseDetails(fullCase);
                                openArchiveCaseModal();
                            }}
                        >
                            {isArchived ? (
                                <BiSolidLock size={22} />
                            ) : (
                                <BiSolidLockOpen size={22} />
                            )}
                        </button>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Établie par: {requestedBy.username}</li>
                        <li>
                            Traitée par:{" "}
                            {handledBy?.username || "Pas encore traitée."}
                        </li>
                        <li>Créée le: {formatDate(createdAt)}</li>
                        {/* <li>Complétée le: {formatDate(completedAt)}</li> */}
                    </ul>
                </div>
                <div className="card-actions items-center justify-between">
                    <div
                        className="tooltip tooltip-right tooltip-info"
                        data-tip="Voir la demande"
                    >
                        <button
                            onClick={() => {
                                setFullCaseDetails(fullCase);
                                openDAMModal();
                            }}
                        >
                            <CgNotes size={22} />
                        </button>
                    </div>
                    <button
                        className="btn btn-accent"
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

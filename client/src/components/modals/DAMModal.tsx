import { Details } from "../../pages/Cases";
import t from "../../utils/TranslateKeys";

interface props {
    details: Details | null;
    isOpen: boolean;
    close: () => void;
}

const DAMModal = ({ details, isOpen, close }: props) => {
    return (
        <dialog className="modal" open={isOpen}>
            <div className="modal-box w-full">
                {details && (
                    <ul className="flex flex-col">
                        {Object.keys(details).map((detail, idx) => (
                            <li key={idx}>
                                {t(detail)}:{" "}
                                {(details as Record<string, string>)[detail]}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="modal-action">
                    <button className="btn" onClick={close}>
                        Fermer
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default DAMModal;

import { MdClose } from "react-icons/md";
import { Details } from "../../pages/Cases";
import t from "../../utils/TranslateKeys";
import DAMForm from "../forms/DAM";

interface props {
    details: Details | null;
    isOpen: boolean;
    close: () => void;
}

const DAMModal = ({ details, isOpen, close }: props) => {
    return (
        <dialog className="modal" open={isOpen}>
            <div className="modal-box max-w-3xl">
                {/* {details && (
                    <ul className="flex flex-col">
                        {Object.keys(details).map((detail, idx) => (
                            <li key={idx}>
                                {t(detail)}:{" "}
                                {(details as Record<string, string>)[detail]}
                            </li>
                        ))}
                    </ul>
                )} */}
                <button onClick={close}>
                    <MdClose
                        size={32}
                        className="absolute right-6 top-6 hover:text-primary z-10"
                    />
                </button>
                <DAMForm />
            </div>
        </dialog>
    );
};

export default DAMModal;

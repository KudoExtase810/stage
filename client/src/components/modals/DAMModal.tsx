import { MdClose } from "react-icons/md";
import DAMForm from "../forms/DAM";

interface props {
    details: DAMRequest;
    isOpen: boolean;
    close: () => void;
    DAMRequests: DAMRequest[];
    setDAMRequests: React.Dispatch<React.SetStateAction<DAMRequest[]>>;
}

const DAMModal = ({
    details,
    isOpen,
    close,
    DAMRequests,
    setDAMRequests,
}: props) => {
    return (
        <dialog className="modal" open={isOpen}>
            <div className="modal-box max-w-3xl">
                <button onClick={close}>
                    <MdClose
                        size={32}
                        className="absolute right-6 top-6 hover:text-primary z-10"
                    />
                </button>
                <DAMForm
                    DAMRequests={DAMRequests}
                    setDAMRequests={setDAMRequests}
                    existingData={details}
                />
            </div>
        </dialog>
    );
};

export default DAMModal;
{
    /* //! {details && (
                    <ul className="flex flex-col">
                        {Object.keys(details).map((detail, idx) => (
                            <li key={idx}>
                                {t(detail)}:{" "}
                                {(details as Record<string, string>)[detail]}
                            </li>
                        ))}
                    </ul>
                )} */
}

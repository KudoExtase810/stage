import { MdClose } from "react-icons/md";
import DAMForm from "../forms/DAM";
import Overlay from "../Overlay";

interface props {
    details: DAMRequest;
    isOpen: boolean;
    close: () => void;
    DAMRequests: DAMRequest[];
    setDAMRequests: React.Dispatch<React.SetStateAction<DAMRequest[]>>;
    readOnlyMode?: boolean;
}

const DAMModal = ({
    details,
    isOpen,
    close,
    DAMRequests,
    setDAMRequests,
    readOnlyMode,
}: props) => {
    return (
        <dialog className="modal" open={isOpen}>
            <Overlay />
            <div className="modal-box max-w-3xl">
                <button onClick={close}>
                    <MdClose
                        size={32}
                        className="absolute right-6 top-6 hover:text-primary z-10"
                    />
                </button>
                <DAMForm
                    readOnlyMode={readOnlyMode}
                    DAMRequests={DAMRequests}
                    setDAMRequests={setDAMRequests}
                    existingData={details}
                    close={close}
                />
            </div>
        </dialog>
    );
};

export default DAMModal;

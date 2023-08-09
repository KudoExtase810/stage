import { useFormType } from "../../context/FormContext";
import DAMForm from "../forms/DAM";
import SJForm from "../forms/SJ";
import SJBillForm from "../forms/SJBill";
import SJPVForm from "../forms/SJPV";
import { MdClose } from "react-icons/md";

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// Return the form as a component depending on the formType state
const DataForm = () => {
    const { formType } = useFormType();
    switch (formType) {
        case "DAM":
            return <DAMForm />;
        case "SJ":
            return <SJForm />;
        case "SJBill":
            return <SJBillForm />;
        case "SJPV":
            return <SJPVForm />;
    }
};

const PostModal = ({ showModal, setShowModal }: ModalProps) => {
    const { formType } = useFormType();
    return (
        <dialog className="modal" open={showModal}>
            <div className="modal-box max-w-3xl p-0">
                <button className="" onClick={() => setShowModal(false)}>
                    <MdClose
                        size={32}
                        className="absolute right-6 top-6 hover:text-primary z-10"
                    />
                </button>
                <section>
                    <h2 className="mx-auto w-fit font-semibold text-3xl text-accent">
                        Formulaire de {formType}
                    </h2>
                    <DataForm />
                </section>
            </div>
        </dialog>
    );
};

export default PostModal;

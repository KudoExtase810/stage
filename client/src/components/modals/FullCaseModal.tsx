import { MdClose } from "react-icons/md";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import SJForm from "../forms/SJ";
import SJPVForm from "../forms/SJPV";
import SJBillForm from "../forms/SJBill";
import Overlay from "../Overlay";

interface props {
    isOpen: boolean;
    close: () => void;
    fullCase: FullCase | null;
    fullCases: FullCase[];
}

const FullCaseModal = ({ isOpen, close, fullCase, fullCases }: props) => {
    // Each form data is not populated on the backend and only its id is assigned to the case when created
    const pages = [
        <SJForm
            fullCases={fullCases}
            formId={fullCase?.SJRequest}
            fullCaseId={fullCase?._id!}
            nextPage={() => handlePage(1)}
        />,
        <SJPVForm
            fullCases={fullCases}
            formId={fullCase?.PV}
            fullCaseId={fullCase?._id!}
            nextPage={() => handlePage(1)}
        />,
        <SJBillForm
            fullCases={fullCases}
            formId={fullCase?.bill}
            fullCaseId={fullCase?._id!}
            close={close}
        />,
    ];
    const [pageIndex, setPageIndex] = useState(0);

    const handlePage = (direction: -1 | 1) => {
        let newIndex = pageIndex + direction;

        if (newIndex < 0) {
            newIndex = pages.length - 1; // Go to the last page when at the beginning
        } else if (newIndex >= pages.length) {
            newIndex = 0; // Go to the first page when at the end
        }

        setPageIndex(newIndex);
    };

    useEffect(() => {
        // progress can be 0 / 1 / 2 / 3
        // page index should be 0 / 1 / 2
        if (fullCase?.progress === 0) return setPageIndex(0);
        if (fullCase?.progress) {
            setPageIndex(fullCase.progress - 1);
        }
    }, [fullCase]);

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
                <ul className="steps steps-horizontal w-full">
                    <li className={`step ${pageIndex >= 0 && "step-primary"}`}>
                        <span
                            className={
                                pageIndex === 0 ? "text-accent" : undefined
                            }
                        >
                            Demande
                        </span>
                    </li>
                    <li className={`step ${pageIndex >= 1 && "step-primary"}`}>
                        <span
                            className={
                                pageIndex === 1 ? "text-accent" : undefined
                            }
                        >
                            Procès-verbal
                        </span>
                    </li>
                    <li className={`step ${pageIndex >= 2 && "step-primary"}`}>
                        <span
                            className={
                                pageIndex === 2 ? "text-accent" : undefined
                            }
                        >
                            Facture
                        </span>
                    </li>
                </ul>

                {/* relevant form */}
                {pages[pageIndex]}

                <div className="modal-action">
                    <div className="join grid grid-cols-2">
                        <button
                            className="join-item btn btn-outline"
                            onClick={() => handlePage(-1)}
                        >
                            <FaLongArrowAltLeft size={26} />
                        </button>
                        <button
                            className="join-item btn btn-outline"
                            onClick={() => handlePage(1)}
                        >
                            <FaLongArrowAltRight size={26} />
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default FullCaseModal;

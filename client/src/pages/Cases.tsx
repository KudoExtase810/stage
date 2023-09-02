import { useEffect, useState } from "react";
import _Cases from "../components/cases/Cases";
import DAMModal from "../components/modals/DAMModal";
import FullCaseModal from "../components/modals/FullCaseModal";

export type Details = PVForm | BillForm | DAMRequest;

const Cases = () => {
    // Full case
    const [showFullCaseModal, setShowFullCaseModal] = useState(false);
    const [fullCaseDetails, setFullCaseDetails] = useState<FullCase | null>(
        null
    );

    // DAM Request
    const [showDAMModal, setShowDAMModal] = useState(false);
    const [DAMReqDetails, setDAMReqDetails] = useState<DAMRequest | null>(null);

    // clear details whenever their modal closes
    useEffect(() => {
        if (!showDAMModal) setDAMReqDetails(null);
        if (!showFullCaseModal) setFullCaseDetails(null);
    }, [showDAMModal, showFullCaseModal]);

    return (
        <>
            <DAMModal
                isOpen={showDAMModal}
                close={() => setShowDAMModal(false)}
                details={DAMReqDetails}
            />
            <FullCaseModal
                isOpen={showFullCaseModal}
                close={() => setShowFullCaseModal(false)}
                fullCase={fullCaseDetails}
            />
            <_Cases
                openDAMModal={() => setShowDAMModal(true)}
                openFullCaseModal={() => setShowFullCaseModal(true)}
                setDAMReqDetails={setDAMReqDetails}
            />
        </>
    );
};

export default Cases;

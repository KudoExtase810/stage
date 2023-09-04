import { useState } from "react";
import AllCases from "../components/cases/AllCases";
import FullCaseModal from "../components/modals/FullCaseModal";
import ArchiveCase from "../components/modals/ArchiveCase";

const Cases = () => {
    // full case containing the dam request, sj request, pv, and bill
    const [fullCases, setFullCases] = useState<FullCase[]>([]);

    // warning modal
    const [showArchiveCaseModal, setShowArchiveCaseModal] = useState(false);

    const [showFullCaseModal, setShowFullCaseModal] = useState(false);
    const [fullCaseDetails, setFullCaseDetails] = useState<FullCase | null>(
        null
    );

    return (
        <>
            <FullCaseModal
                isOpen={showFullCaseModal}
                close={() => {
                    setShowFullCaseModal(false);
                    setFullCaseDetails(null);
                }}
                fullCase={fullCaseDetails}
            />

            <ArchiveCase
                fullCase={fullCaseDetails}
                fullCases={fullCases}
                setFullCases={setFullCases}
                isOpen={showArchiveCaseModal}
                close={() => setShowArchiveCaseModal(false)}
            />

            <AllCases
                fullCases={fullCases}
                setFullCases={setFullCases}
                openFullCaseModal={() => setShowFullCaseModal(true)}
                openArchiveCaseModal={() => setShowArchiveCaseModal(true)}
                setFullCaseDetails={setFullCaseDetails}
            />
        </>
    );
};

export default Cases;

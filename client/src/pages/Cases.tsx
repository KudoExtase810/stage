import { useEffect, useState } from "react";
import AllCases from "../components/cases/AllCases";
import FullCaseModal from "../components/modals/FullCaseModal";
import ArchiveCase from "../components/modals/ArchiveCase";
import DAMModal from "../components/modals/DAMModal";
import axiosIns from "../common/axios";

const Cases = () => {
    // full case containing the dam request, sj request, pv, and bill
    const [fullCases, setFullCases] = useState<FullCase[]>([]);

    // warning modal
    const [showArchiveCaseModal, setShowArchiveCaseModal] = useState(false);

    const [showFullCaseModal, setShowFullCaseModal] = useState(false);
    const [fullCaseDetails, setFullCaseDetails] = useState<FullCase | null>(
        null
    );

    // dam modal
    const [showDAMModal, setShowDAMModal] = useState(false);
    const [DAMRequestDetails, setDAMRequestDetails] =
        useState<DAMRequest | null>(null);

    useEffect(() => {
        const getDAMRequest = async () => {
            const res = await axiosIns.get(
                `/forms/DAM/${fullCaseDetails?.DAMRequest}`
            );
            setDAMRequestDetails(res.data);
        };
        showDAMModal && fullCaseDetails && getDAMRequest();
    }, [showDAMModal]);

    return (
        <>
            <FullCaseModal
                fullCases={fullCases}
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

            <DAMModal
                isOpen={showDAMModal}
                close={() => setShowDAMModal(false)}
                DAMRequests={[]}
                setDAMRequests={() => {}}
                details={DAMRequestDetails!}
                readOnlyMode
            />

            <AllCases
                fullCases={fullCases}
                setFullCases={setFullCases}
                openFullCaseModal={() => setShowFullCaseModal(true)}
                openArchiveCaseModal={() => setShowArchiveCaseModal(true)}
                setFullCaseDetails={setFullCaseDetails}
                openDAMModal={() => setShowDAMModal(true)}
            />
        </>
    );
};

export default Cases;

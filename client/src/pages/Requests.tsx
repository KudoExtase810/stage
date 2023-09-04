import { useState } from "react";
import DAMModal from "../components/modals/DAMModal";
import AllRequests from "../components/requests/AllRequests";

const Requests = () => {
    // only the dam request that was first created, which causes a new case to be created in the db
    const [DAMRequests, setDAMRequests] = useState<DAMRequest[]>([]);

    const [showDAMModal, setShowDAMModal] = useState(false);
    const [DAMReqDetails, setDAMReqDetails] = useState<DAMRequest | null>(null);

    return (
        <>
            <DAMModal
                isOpen={showDAMModal}
                close={() => {
                    setShowDAMModal(false);
                    setDAMReqDetails(null);
                }}
                details={DAMReqDetails!}
                DAMRequests={DAMRequests}
                setDAMRequests={setDAMRequests}
            />

            <AllRequests
                DAMRequests={DAMRequests}
                setDAMRequests={setDAMRequests}
                openDAMModal={() => setShowDAMModal(true)}
                setDAMReqDetails={setDAMReqDetails}
            />
        </>
    );
};

export default Requests;

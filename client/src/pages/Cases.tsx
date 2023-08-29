import { useEffect, useState } from "react";
import _Cases from "../components/cases/Cases";
import FormModal from "../components/modals/FormModal";
import CardDetailsModal from "../components/modals/CardDetailsModal";

export type Details = PVForm | BillForm | DAMRequest;

const Cases = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [fullCardDetails, setFullCardDetails] = useState<Details | null>(
        null
    );

    // clear details whenever their modal closes
    useEffect(() => {
        if (!showDetailsModal) setFullCardDetails(null);
    }, [showDetailsModal]);

    return (
        <>
            <FormModal
                isOpen={showFormModal}
                close={() => setShowFormModal(false)}
            />
            <CardDetailsModal
                isOpen={showDetailsModal}
                close={() => setShowDetailsModal(false)}
                details={fullCardDetails}
            />
            <_Cases
                openFormModal={() => setShowFormModal(true)}
                openDetailsModal={() => setShowDetailsModal(true)}
                setFullCardDetails={setFullCardDetails}
            />
        </>
    );
};

export default Cases;

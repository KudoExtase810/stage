import { useState } from "react";
import FormModal from "../components/modals/FormModal";
import Hero from "../components/home/Hero";

const Home = () => {
    // modal toggle
    const [showFormModal, setShowFormModal] = useState(false);

    return (
        <>
            <Hero openModal={() => setShowFormModal(true)} />
            <FormModal
                isOpen={showFormModal}
                close={() => setShowFormModal(false)}
            />
        </>
    );
};

export default Home;

import { useState } from "react";
import PostModal from "../components/modals/PostModal";
import Hero from "../components/home/Hero";

const Home = () => {
    // modals toggle
    const [showPostModal, setShowPostModal] = useState(false);

    return (
        <>
            <Hero openModal={() => setShowPostModal(true)} />
            <PostModal
                showModal={showPostModal}
                setShowModal={setShowPostModal}
            />
        </>
    );
};

export default Home;

import { useState } from "react";
import PostModal from "../components/modals/PostModal";
import Hero from "../components/dashboard/Hero";
import AddUserModal from "../components/modals/AddUserModal";

const Dashboard = () => {
    // modals toggle
    const [showPostModal, setShowPostModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);

    return (
        <>
            <Hero openModal={() => setShowPostModal(true)} />
            <PostModal
                showModal={showPostModal}
                setShowModal={setShowPostModal}
            />
            <AddUserModal
                showModal={showUserModal}
                setShowModal={setShowUserModal}
            />
        </>
    );
};

export default Dashboard;

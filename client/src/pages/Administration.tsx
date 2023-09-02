import { useEffect, useState } from "react";
import Users from "../components/administration/Users";
import UserModal from "../components/modals/UserModal";
import DeleteUser from "../components/modals/DeleteUser";

const Administration = () => {
    // modals toggle
    const [showUserModal, setShowUserModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [users, setUsers] = useState<User[]>([]);

    // The user selected for edit / delete
    const [actionUser, setActionUser] = useState<User | null>(null);

    // Clear the form from the user's data after closing it
    useEffect(() => {
        if (!showUserModal && !showDeleteModal) setActionUser(null);
    }, [showUserModal, showDeleteModal]);

    return (
        <>
            <UserModal
                users={users}
                setUsers={setUsers}
                actionUser={actionUser}
                setActionUser={setActionUser}
                isOpen={showUserModal}
                close={() => setShowUserModal(false)}
            />

            <DeleteUser
                users={users}
                setUsers={setUsers}
                actionUser={actionUser}
                isOpen={showDeleteModal}
                close={() => setShowDeleteModal(false)}
            />

            <Users
                users={users}
                setUsers={setUsers}
                openUserModal={() => setShowUserModal(true)}
                openDeleteModal={() => setShowDeleteModal(true)}
                setActionUser={setActionUser}
            />
        </>
    );
};

export default Administration;

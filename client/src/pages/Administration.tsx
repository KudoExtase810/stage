import { useState } from "react";
import UsersTable from "../components/administration/UsersTable";
import AddUserModal from "../components/modals/AddUserModal";

const Administration = () => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    return (
        <>
            <AddUserModal
                users={users}
                setUsers={setUsers}
                isOpen={showUserModal}
                closeModal={() => setShowUserModal(false)}
            />
            <UsersTable
                users={users}
                setUsers={setUsers}
                openAddUserModal={() => setShowUserModal(true)}
            />
        </>
    );
};

export default Administration;

import { useEffect } from "react";
import SingleUser from "./SingleUser";
import { authFetch } from "../../common/axiosInstances";
import { IoMdPersonAdd } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";

interface props {
    openAddUserModal: () => void;
    users: User[] | [];
    setUsers: React.Dispatch<React.SetStateAction<User[] | []>>;
}

const UsersTable = ({ users, setUsers, openAddUserModal }: props) => {
    useEffect(() => {
        const getAllUsers = async () => {
            const res = await authFetch.get("/users/all");
            setUsers(res.data);
        };
        getAllUsers();
    }, []);

    return (
        <>
            <div className="flex justify-between p-6 gap-10 bg-base-300 mb-4">
                <div className="join">
                    <input
                        className="input input-bordered join-item"
                        placeholder="Search"
                    />

                    <select className="select select-bordered join-item">
                        <option disabled selected>
                            Filter
                        </option>
                    </select>

                    <button className="btn btn-primary join-item">
                        <HiOutlineSearch size={22} />
                    </button>
                </div>
                <button
                    className="btn btn-primary btn-md px-5"
                    onClick={openAddUserModal}
                >
                    <span>Nouveau compte</span>
                    <IoMdPersonAdd size={22} />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom / Rôle</th>
                            <th>Adresse e-mail</th>
                            <th>Créé le</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, idx) => (
                            <SingleUser
                                user={user}
                                index={idx}
                                key={user._id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersTable;

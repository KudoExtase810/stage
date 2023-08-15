import { useEffect, useMemo, useState } from "react";
import SingleUser from "./SingleUser";
import axiosIns from "../../api/axios";
import { IoMdPersonAdd } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import useToken from "../../hooks/useToken";

interface props {
    openUserModal: () => void;
    openDeleteModal: () => void;
    users: User[] | [];
    setUsers: React.Dispatch<React.SetStateAction<User[] | []>>;
    setActionUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UsersTable = ({
    openUserModal,
    openDeleteModal,
    users,
    setUsers,
    setActionUser,
}: props) => {
    const { token } = useToken();

    // Get the necessary users data
    useEffect(() => {
        const getAllUsers = async () => {
            const res = await axiosIns.get("/users/all", {
                headers: { authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        };
        getAllUsers();
    }, []);

    // ----Sorting----

    const handleSort = (method: "username" | "createdAt" | "role") => {
        if (method === "username") {
            const sortedUsers = [...users].sort((a, b) =>
                a.username.localeCompare(b.username)
            );
            setUsers(sortedUsers);
        } else if (method === "role") {
            const sortedUsers = [...users].sort((a, b) =>
                a.role.localeCompare(b.role)
            );
            setUsers(sortedUsers);
        } else if (method === "createdAt") {
            const sortedUsers = [...users].sort((a, b) =>
                a.createdAt.localeCompare(b.createdAt)
            );
            setUsers(sortedUsers);
        } else {
            setUsers([...users]);
        }
    };

    // ----Search filter----
    // search filter input will filter depedning on this method
    const [searchMethod, setSearchMethod] = useState<"username" | "email">(
        "username"
    );
    const [query, setQuery] = useState("");

    const toggleSearchMethod = () => {
        const switchTo = searchMethod === "username" ? "email" : "username";
        setSearchMethod(switchTo);
    };

    // Filter users based on search method
    const filteredUsers = useMemo(() => {
        if (!query) return users;
        return users.filter((user) => {
            return user[searchMethod]
                .toLowerCase()
                .includes(query.toLowerCase());
        });
    }, [query, users, searchMethod]);

    return (
        <>
            <div className="flex justify-between p-6 gap-10 bg-base-300 mb-4">
                <div className="join">
                    <div className="relative">
                        <input
                            className="input input-bordered join-item pr-4"
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder={`Filtrer par ${
                                searchMethod === "username" ? "nom" : "email"
                            }..`}
                        />{" "}
                        <button
                            className={`absolute right-2 top-[13px] hover:text-green-500 ${
                                searchMethod === "email" ? "text-green-500" : ""
                            }`}
                            onClick={toggleSearchMethod}
                        >
                            <MdEmail size={22} />
                        </button>
                    </div>

                    <select
                        className="select select-bordered join-item"
                        defaultValue="username"
                        onChange={(e) =>
                            handleSort(
                                e.target.value as
                                    | "username"
                                    | "createdAt"
                                    | "role"
                            )
                        }
                    >
                        <option disabled>Trier par</option>
                        <option value="username">Nom (A-Z)</option>
                        <option value="role">Rôle (A-Z)</option>
                        <option value="createdAt">Date</option>
                    </select>

                    <button className="btn btn-primary join-item">
                        <HiOutlineSearch size={22} />
                    </button>
                </div>
                <button
                    className="btn btn-primary btn-md px-5"
                    onClick={openUserModal}
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
                        {filteredUsers?.map((user, idx) => (
                            <SingleUser
                                user={user}
                                index={idx}
                                key={user._id}
                                openActionModal={openUserModal}
                                openDeleteModal={openDeleteModal}
                                setActionUser={setActionUser}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersTable;

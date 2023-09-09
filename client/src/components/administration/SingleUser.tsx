import { BiSolidEditAlt } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";

import { formatDate } from "../../utils/DateFormatter";
import useToken from "../../hooks/useToken";
import toast from "react-hot-toast";

interface props {
    user: User | null;
    index: number;
    openActionModal: () => void;
    openDeleteModal: () => void;
    setActionUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const SingleUser = ({
    user,
    index,
    openActionModal,
    openDeleteModal,
    setActionUser,
}: props) => {
    const { userId } = useToken();

    return (
        <tr>
            <th>{index + 1 > 9 ? index + 1 : `0${index + 1}`}</th>
            <td>
                <div className="font-bold">{user?.username}</div>
                <div className="text-sm opacity-50">{user?.role}</div>
            </td>
            <td>{user?.email}</td>
            <td>{formatDate(user?.createdAt!)}</td>
            <th>
                <div className="flex gap-2">
                    <div className="md:tooltip" data-tip="Modifier">
                        <button
                            className="text-blue-600 hover:text-blue-500"
                            onClick={() => {
                                setActionUser(user);
                                openActionModal();
                            }}
                        >
                            <BiSolidEditAlt size={22} />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Supprimer">
                        <button
                            className="text-red-600 hover:text-red-500"
                            onClick={() => {
                                if (userId === user?._id)
                                    return toast.error(
                                        "Vous ne pouvez pas supprimer votre propre compte!"
                                    );
                                setActionUser(user);
                                openDeleteModal();
                            }}
                        >
                            <FiTrash size={22} />
                        </button>
                    </div>
                </div>
            </th>
        </tr>
    );
};
export default SingleUser;

import toast from "react-hot-toast";
import axiosIns from "../../common/axios";
import { isAxiosError } from "axios";
import useToken from "../../hooks/useToken";

interface props {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    actionUser: User | undefined;
    isOpen: boolean;
    close: () => void;
}

const DeleteUser = ({ users, setUsers, actionUser, isOpen, close }: props) => {
    const { token } = useToken();

    const handleDelete = async () => {
        try {
            await axiosIns.delete(`/users/${actionUser?._id}`, {
                headers: { authorization: `Bearer ${token}` },
            });

            const newUsers = users.filter(
                (user) => user._id !== actionUser?._id
            );
            setUsers(newUsers);

            toast.success("Compte supprimé avec succés!");

            close();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
            console.error(error);
        }
    };

    return (
        <dialog className="modal" open={isOpen}>
            <div className="modal-box w-full max-w-2xl">
                <h3 className="font-bold text-lg">
                    Supprimer {actionUser?.username}?
                </h3>
                <p className="py-4">
                    La suppression de cet utilisateur est{" "}
                    <span className="text-red-500">irréversible</span>.
                    Souhaitez-vous continuer ?
                </p>
                <div className="modal-action">
                    <button className="btn btn-outline" onClick={close}>
                        Annuler
                    </button>
                    <button
                        className="btn btn-error bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                        onClick={handleDelete}
                    >
                        Oui, supprimer
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteUser;

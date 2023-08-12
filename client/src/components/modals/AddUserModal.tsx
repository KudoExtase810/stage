import { MdClose } from "react-icons/md";
import { authFetch } from "../../common/axiosInstances";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";

interface props {
    isOpen: boolean;
    closeModal: () => void;
    users: User[] | [];
    setUsers: React.Dispatch<React.SetStateAction<User[] | []>>;
}

type FormValues = {
    username: string;
    email: string;
    password: string;
    role: User["role"];
};

const AddUserModal = ({ isOpen, closeModal, users, setUsers }: props) => {
    const { register, handleSubmit, formState } = useForm<FormValues>();

    const createNewUser = async (data: FormValues) => {
        try {
            const res = await authFetch.post("/users/create", data);
            toast.success("Compte créé avec succés!");
            setUsers([...users, res.data.user]);
            closeModal();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    return (
        <dialog className="modal" open={isOpen}>
            <div className="modal-box max-w-xl p-0">
                <button onClick={closeModal}>
                    <MdClose
                        size={32}
                        className="absolute right-6 top-6 hover:text-primary z-10"
                    />
                </button>
                <form
                    className="card flex-shrink-0 w-full shadow-2xl bg-base-100"
                    onSubmit={handleSubmit(createNewUser)}
                    noValidate
                >
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label" htmlFor="username">
                                <span className="label-text">
                                    Nom d'utilisateur
                                </span>
                            </label>
                            <input
                                id="username"
                                {...register("username", {
                                    required: "Ce champ est obligatoire.",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Username must be at least 6 characters.",
                                    },
                                    maxLength: {
                                        value: 32,
                                        message:
                                            "Username cannot exceed 32 characters.",
                                    },
                                })}
                                type="text"
                                placeholder="Mohammed Ali"
                                className="input input-bordered hover:border-primary"
                            />
                            <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                                {formState.errors.username?.message}
                            </span>
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">
                                    Adresse e-mail
                                </span>
                            </label>
                            <input
                                id="email"
                                {...register("email", {
                                    required: "Ce champ est obligatoire.",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Email must be at least 6 characters.",
                                    },
                                    maxLength: {
                                        value: 72,
                                        message:
                                            "Email cannot exceed 72 characters.",
                                    },
                                })}
                                placeholder="mohamed-ali@gmail.com"
                                autoComplete="off"
                                className="input input-bordered hover:border-primary"
                            />
                            <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                                {formState.errors.email?.message}
                            </span>
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Mot de passe</span>
                            </label>
                            <input
                                autoComplete="off"
                                id="password"
                                {...register("password", {
                                    required: "Ce champ est obligatoire.",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters.",
                                    },
                                    maxLength: {
                                        value: 32,
                                        message:
                                            "Password cannot exceed 32 characters.",
                                    },
                                })}
                                type="password"
                                placeholder="••••••••••••"
                                className="input input-bordered hover:border-primary"
                            />
                            <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                                {formState.errors.password?.message}
                            </span>
                        </div>
                        <div className="form-control w-full max-w-sm">
                            <label className="label" htmlFor="role">
                                <span className="label-text">Rôle</span>
                            </label>
                            <select
                                defaultValue=""
                                id="role"
                                className="select select-bordered hover:border-primary"
                                {...register("role", {
                                    required: "Ce champ est obligatoire.",
                                })}
                            >
                                <option value="" disabled>
                                    Choisissez le rôle de l'utilisateur
                                </option>
                                <option value="Admin">Administrateur</option>
                                <option value="DAM">DAM</option>
                                <option value="SJ">Service Juridique</option>
                            </select>
                            <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                                {formState.errors.role?.message}
                            </span>
                        </div>

                        <div className="form-control mt-6">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={formState.isSubmitting}
                            >
                                {formState.isSubmitting ? (
                                    <span className="loading loading-spinner loading-lg text-gray-300"></span>
                                ) : (
                                    "Créer le compte"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default AddUserModal;

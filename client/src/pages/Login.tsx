import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { normalFetch } from "../common/axiosInstances";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import { useUserData } from "../context/UserContext";

type FormValues = {
    username: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState } = useForm<FormValues>();

    const navigate = useNavigate();

    // user data
    const { setData } = useUserData();

    const handleLogin = async (data: FormValues) => {
        try {
            // post login credentials to auth endpoint
            const res = await normalFetch.post("/auth/login", data);
            cookies.set("sg-auth-token", res.data.token);
            setData(res.data.user);
            toast.success("Successfully logged in.");
            navigate("/", { replace: true });
        } catch (error: any) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            }
            console.log(error);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <form
                    className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                    onSubmit={handleSubmit(handleLogin)}
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
                                id="username"
                                type="text"
                                placeholder="Mohammed Ali"
                                className="input input-bordered"
                            />
                            <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                                {formState.errors.username?.message}
                            </span>
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Mot de passe</span>
                            </label>
                            <input
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
                                id="password"
                                type="password"
                                placeholder="••••••••••••"
                                className="input input-bordered"
                            />
                            <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                                {formState.errors.password?.message}
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
                                    "Se connecter"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

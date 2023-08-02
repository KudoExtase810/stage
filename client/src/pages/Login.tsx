import { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { normalFetch } from "../common/axiosInstances";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const credentials = { username, password };
        try {
            const res = await normalFetch.post("/auth/login", credentials);
            toast.success("Successfully logged in.");
            // TODO: config jwt
            console.log(res.data.token);
            navigate("/");
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
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
                    onSubmit={handleLogin}
                >
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="username"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

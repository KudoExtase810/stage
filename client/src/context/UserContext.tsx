import { useState, useContext, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import { authFetch } from "../common/axiosInstances";

type CtxProps = {
    children: React.ReactNode;
};

type UserContext = {
    data: User | undefined;
    setData: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = createContext({} as UserContext);

export const useUserData = () => useContext(UserContext);

const UserContextProvider = ({ children }: CtxProps) => {
    const [data, setData] = useState<User>();
    const { userId } = useAuth();

    useEffect(() => {
        const getUserData = async () => {
            const response = await authFetch.get(`/users/${userId}`);
            setData(response.data as User);
        };
        if (userId && !data) getUserData();
    }, []);

    return (
        <UserContext.Provider value={{ data, setData }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;

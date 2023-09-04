import { useState, useContext, useEffect, createContext } from "react";
import useToken from "../hooks/useToken";
import axiosIns from "../common/axios";

type CtxProps = {
    children: React.ReactNode;
};

type UserContext = {
    userData: User | null;
    setUserData: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext({} as UserContext);

export const useAuth = () => useContext(UserContext);

const UserContextProvider = ({ children }: CtxProps) => {
    const [userData, setUserData] = useState<User | null>(null);
    const { userId } = useToken();

    useEffect(() => {
        const getUserData = async () => {
            const response = await axiosIns.get(`/users/${userId}`);
            setUserData(response.data as User);
        };
        if (userId && !userData) getUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;

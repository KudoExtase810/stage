import { useState, useContext, useEffect, createContext } from "react";
import useToken from "../hooks/useToken";
import axiosIns from "../common/axios";

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
    const { userId } = useToken();

    useEffect(() => {
        const getUserData = async () => {
            const response = await axiosIns.get(`/users/${userId}`);
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

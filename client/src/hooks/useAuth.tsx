import decodeToken from "jwt-decode";
import cookies from "js-cookie";

type Payload = {
    _id: string;
};

const useAuth = () => {
    const token = cookies.get("sg-auth-token");
    if (!token) return { userId: "" };
    const decoded = decodeToken(token) as Payload;

    return { userId: decoded._id, token };
};
export default useAuth;

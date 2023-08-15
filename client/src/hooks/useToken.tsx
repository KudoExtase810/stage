import decodeToken from "jwt-decode";
import cookies from "js-cookie";

type Payload = {
    _id: string;
    role: User["role"];
};

const useToken = () => {
    const token = cookies.get("sg-auth-token");
    if (!token) return { userId: "" };
    const decoded = decodeToken(token) as Payload;
    return { userId: decoded._id, role: decoded.role, token };
};
export default useToken;

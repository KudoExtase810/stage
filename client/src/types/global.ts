type User = {
    _id: string;
    username: string;
    email: string;
    role: "DAM" | "SJ" | "Admin";
    createdAt: string;
    updatedAt: string;
    tempToken?: string;
};

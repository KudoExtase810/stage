type User = {
    _id: string;
    username: string;
    email: string;
    role: "DAM" | "SJ" | "Admin";
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    createdAt: string;
    updatedAt: string;
};

//? --- CASE ---

// DAM
type DAMRequest = {
    _id: string;
    caseNumber: string;
    date: string;
    lieu: string;
    commission: string;
    service: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
};

// SJ
type SJRequest = {
    _id: string;
    caseNumber: string;
    date: string;
    lieu: string;
    commission: string;
    service: string;
    subject: string;
    huissier: string;
    from: string;
};
type PVForm = {
    _id: string;
    caseNumber: string;
    date: string;
    lieu: string;
    commission: string;
    service: string;
    subject: string;
    huissier: string;
    from: string;
};
type BillForm = {
    _id: string;
    caseNumber: string;
    date: string;
    lieu: string;
    huissier: string;
    payment: string;
};

// Full case SJ+DAM
type FullCase = {
    _id: string;
    DAMRequest: DAMRequest;
    SJRequest: string; // the id of the form not the data (not populated)
    PV: string; // the id of the form not the data (not populated)
    bill: string; // the id of the form not the data (not populated)
    requestedBy: User;
    progress: 0 | 1 | 2 | 3;
    createdAt: string;
    updatedAt: string;
    isArchived: boolean;
};

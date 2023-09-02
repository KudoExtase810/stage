type User = {
    _id: string;
    username: string;
    email: string;
    role: "DAM" | "SJ" | "Admin";
    createdAt: string;
    updatedAt: string;
};

//? --- CASE ---

// DAM
type DAMRequest = {
    _id: string;
    caseNumber: string;
    date: string;
    place: string;
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
    place: string;
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
    place: string;
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
    place: string;
    huissier: string;
    payment: string;
};

// SJ Combination
type SJCase = {
    _id: string;
    demande: SJRequest;
    pv: PVForm;
    bill: BillForm;
};

// Full thing SJ+DAM
type FullCase = {
    _id: string;
    DAM: DAMRequest;
    SJ: SJCase;
    requestedBy: User;
    handledBy: User;
    progress: 0 | 1 | 2 | 3;
    createdAt: string;
    updatedAt: string;
    completedAt: string;
    isArchived: boolean;
};

const TranslateKeys = (key: string) => {
    const translations: Record<string, string> = {
        date: "Date",
        place: "Place",
        commission: "Commission",
        service: "Service",
        description: "Description",
        huissier: "Huissier",
        caseNumber: "Numéro d'affaire",
        subject: "Sujet",
        createdAt: "Créé le",
        updatedAt: "Denière modif",
        from: "Par",
        payment: "Paiement",
    };
    // return translations[key] || key;
    return translations[key] || "No translation available.";
};
export default TranslateKeys;

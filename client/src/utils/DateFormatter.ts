export const formatDate = (dateString: string, separator?: string) => {
    // Turn the string into an actual date
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    // Return the formatted date and seprate between day, month and year using the desired separator
    return formattedDate.replace(/\//g, separator || "-");
};

export const DateFormat = (dateStr) => {
    const year = dateStr.getFullYear();
    const date = String(dateStr.getDate()).padStart(2, "0");
    const month = String(dateStr.getMonth()).padStart(2, "0");
    return `${year}-${month}-${date}`;
}

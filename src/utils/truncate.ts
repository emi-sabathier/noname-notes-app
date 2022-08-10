export const truncate = (str: string) => {
    if (str.length > 40 && str !== '') {
        const sliced = str.slice(0, 40);
        return `${sliced}...`;
    } else {
        return str;
    }
};

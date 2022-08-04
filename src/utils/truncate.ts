export const truncate = (str: string) => {
    if (str !== '') {
        const sliced = str.slice(0, 30);
        return `${sliced}...`;
    }
};

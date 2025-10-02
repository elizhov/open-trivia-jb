import { API_URL } from "./constants.js";

const fetchData = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // categories url convert
        return (data.results || []).map(q => ({
            ...q,
            category: q.category.replace(/&amp;/g, "&"),
        }));
    } catch (error) {
        return { error: error.message };
    }
};

export default fetchData;

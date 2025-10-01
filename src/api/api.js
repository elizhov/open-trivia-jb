import { API_URL } from "./constants.js";

const fetchData = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.results || []; // always return an array
    } catch (error) {
        return { error: error.message };
    }
};

export default fetchData;

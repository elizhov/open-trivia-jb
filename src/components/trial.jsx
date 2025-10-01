import { useState, useEffect } from "react";
import fetchData from "../api/api.js";

const Trial = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);
            } catch {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Questions from API:</h2>
            {data.length > 0 ? (
                <ul>
                    {data.map((q, index) => (
                        <li key={index}>
                            <strong>Category:</strong> {q.category} <br />
                            <strong>Difficulty:</strong> {q.difficulty} <br />
                            <strong>Question:</strong> {q.question}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    );
};

export default Trial;

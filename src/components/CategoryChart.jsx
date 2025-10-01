import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const CategoryChart = ({ questions, selectedCategory }) => {
    // If a category is selected, filter questions
    const filteredQuestions = selectedCategory
        ? questions.filter(q => q.category === selectedCategory)
        : questions;

    const data = getCategoryCounts(filteredQuestions);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <h3>Category Distribution</h3>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// Helper function
const getCategoryCounts = (questions) => {
    const counts = {};
    questions.forEach(q => {
        counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({
        category: key,
        count: counts[key],
    }));
};

export default CategoryChart;

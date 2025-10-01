import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";


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


const CategoryChart = ({ questions, selectedCategory }) => {
    const filteredQuestions = selectedCategory
        ? questions.filter(q => q.category === selectedCategory)
        : questions;

    const data = getCategoryCounts(filteredQuestions);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <h3>Category Distribution</h3>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }} barGap={10}  barSize={20} >
                    <CartesianGrid strokeDasharray="8" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8"  />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryChart;

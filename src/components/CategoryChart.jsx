import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
} from "recharts";
import "../styles/CategoryChart.css";

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
    const data = getCategoryCounts(questions);

    return (
        <div className="category-chart-container">
            <ResponsiveContainer width="100%" height={Math.max(400, data.length * 60)}>
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        type="number"
                        tick={{ fill: "#666", fontSize: 12 }}
                        tickCount={10}
                        axisLine={{ stroke: "#e0e0e0" }}
                    />
                    <YAxis
                        dataKey="category"
                        type="category"
                        width={180}
                        tick={{ fill: "#333", fontSize: 15, fontWeight: 500 }}
                        axisLine={{ stroke: "#e0e0e0" }}
                    />
                    <Tooltip
                        cursor={{ fill: "rgba(123,108,246,0.08)" }}
                        separator=": "
                    />
                    <Bar
                        dataKey="count"
                        radius={[0, 8, 8, 0]}
                        maxBarSize={28}
                    >
                        {data.map((entry) => (
                            <Cell
                                key={`cell-${entry.category}`}
                                fill={
                                    selectedCategory === entry.category
                                        ? "#7b6cf6"
                                        : selectedCategory === null
                                            ? "#8884d8"
                                            : "#d0d0d0"
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryChart;
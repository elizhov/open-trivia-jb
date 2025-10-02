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
        <div style={{ width: "100%" }}>
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
                        wrapperStyle={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                        }}
                        contentStyle={{
                            backgroundColor: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            padding: "12px 16px",
                            fontFamily: "sans-serif"
                        }}
                        labelStyle={{
                            fontWeight: 600,
                            marginBottom: "6px",
                            color: "#7b6cf6",
                            fontSize: "14px"
                        }}
                        itemStyle={{
                            color: "#555",
                            fontSize: "13px"
                        }}
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
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../styles/DifficultyChart.css";

const COLOR_MAP = {
    easy: "#52c41a",
    medium: "#faad14",
    hard: "#ff4d4f",
};

const getDifficultyCounts = (questions) => {
    const counts = { easy: 0, medium: 0, hard: 0 };

    questions.forEach((question) => {
        const dif = question.difficulty;
        if (dif in counts) {
            counts[dif] += 1;
        }
    });

    return Object.keys(counts)
        .map((key) => ({
            name: key,
            value: counts[key],
        }))
        .filter(item => item.value > 0);
};

const DifficultyChart = ({ questions, selectedCategory }) => {
    const filteredQuestions = selectedCategory
        ? questions.filter(q => q.category === selectedCategory)
        : questions;

    const data = getDifficultyCounts(filteredQuestions);

    return (
        <div className="difficulty-chart-container">
            <ResponsiveContainer>
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 80 }}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={{ stroke: '#999', strokeWidth: 1 }}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLOR_MAP[entry.name]}
                                className="difficulty-pie-cell"
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"

                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DifficultyChart;
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLOR_MAP = {
    easy: "#82ca9d",   // green
    medium: "#8884d8", // purple
    hard: "#ff7300",   // orange
};


const getDifficultyCounts = (questions) => {
    const counts = {easy:0, medium:0, hard:0}

    questions.forEach((question) => {
        const dif = question.difficulty
        if(dif in counts) {
           counts[dif] += 1
        }
    })

    return Object.keys(counts).map((key) => ({
        name: key,
        value: counts[key],
    })).filter(item => item.value > 0)

        ;
}

const DifficultyChart = ({ questions, selectedCategory }) => {
    const filteredQuestions = selectedCategory
        ? questions.filter(q => q.category === selectedCategory)
        : questions;

    const data = getDifficultyCounts(filteredQuestions);



    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.name]} />
                        ))}

                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DifficultyChart;
// Categories.jsx
const Categories = ({ questions, onSelectCategory }) => {
    // Extract unique categories from the questions prop
    const uniqueCategories = [...new Set(questions.map(q => q.category))];

    return (
        <div>
            <h3>Categories</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {/* "All" button */}
                <button onClick={() => onSelectCategory(null)}>All</button>

                {uniqueCategories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onSelectCategory(cat)}
                        style={{ padding: "5px 10px", cursor: "pointer" }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categories;

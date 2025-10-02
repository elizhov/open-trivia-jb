import { Button, Flex } from "antd";
 import "../styles/Categories.css";

const Categories = ({ questions, onSelectCategory, selectedCategory }) => {
    const uniqueCategories = [...new Set(questions.map((q) => q.category))];

    return (
        <div className="categories-container">
            <h3 className="categories-title">Categories</h3>
            <Flex wrap="wrap" gap="small" className="categories-list">
                <Button
                    type={selectedCategory === null ? "primary" : "default"}
                    shape="round"
                    onClick={() => onSelectCategory(null)}

                >
                    All
                </Button>

                {uniqueCategories.map((cat) => (
                    <Button
                        key={cat}
                        type={selectedCategory === cat ? "primary" : "default"}
                        shape="round"
                        onClick={() => onSelectCategory(cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </Flex>
        </div>
    );
};

export default Categories;

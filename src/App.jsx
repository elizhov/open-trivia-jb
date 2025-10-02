import { useState, useEffect } from "react";
import { Card, Row, Col, Spin, Alert } from "antd";
import Categories from "./components/Categories";
import fetchData from "./api/api";
import CategoryChart from "./components/CategoryChart.jsx";
import DifficultyChart from "./components/DifficultyChart.jsx";
import "./App.css";

function App() {
    const [questions, setQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const data = await fetchData();
                if (data.error) {
                    setError(data.error);
                } else {
                    setQuestions(data);
                }
            } catch {
                setError("Failed to fetch questions");
            } finally {
                setLoading(false);
            }
        };

        getQuestions();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <Spin size="large" />
                <p style={{ marginTop: 16, color: "#7b6cf6" }}>Loading questions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Trivia Dashboard</h1>
                <p className="app-subtitle">
                    Explore {questions.length} questions across multiple categories
                </p>
            </header>

            <div className="filters-section">
                <Categories
                    questions={questions}
                    onSelectCategory={(cat) => setSelectedCategory(cat)}
                    selectedCategory={selectedCategory}
                />
            </div>

            <Row gutter={[24, 24]} className="charts-section">
                <Col xs={24} lg={16}>
                    <Card
                        className="chart-card"
                        title={
                            <div className="card-title">
                                Category Distribution
                            </div>
                        }
                        variant="borderless"
                    >
                        <CategoryChart
                            questions={questions}
                            selectedCategory={selectedCategory}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        className="chart-card"
                        title={
                            <div className="card-title">
                                Difficulty Breakdown
                                {selectedCategory && (
                                    <span className="card-subtitle">
                    for {selectedCategory}
                  </span>
                                )}
                            </div>
                        }
                        variant="borderless"
                    >
                        <DifficultyChart
                            questions={questions}
                            selectedCategory={selectedCategory}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default App;
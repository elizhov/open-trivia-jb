import { useState, useEffect } from "react";
import Categories from "./components/Categories";
import fetchData from "./api/api";
import CategoryChart from "./components/CategoryChart.jsx";
import DifficultyChart from "./components/DifficultyChart.jsx";

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

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div>
        <Categories
            questions={questions}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        <CategoryChart
            questions={questions}
            selectedCategory={selectedCategory}
        />
        <DifficultyChart
        questions={questions}
        selectedCategory={selectedCategory}
        />
      </div>
  );
}

export default App;

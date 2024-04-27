import React, { useState, useEffect } from "react";
import data from "./Data";
import "./App.css";
import "./index.css";
import WeatherCard from "./Weather";
export default function Main() {
  const [news, setNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [showAllNews, setShowAllNews] = useState(false);

  useEffect(() => {
    setNews(data);
  }, []);

  useEffect(() => {
    filterNews();
  }, [news, selectedCategory, searchTerm, showAllNews]);

  const filterNews = () => {
    let filteredNews = news;

    if (!showAllNews) {
      filteredNews = filteredNews.slice(0, 7);
    }

    if (selectedCategory !== "ALL") {
      filteredNews = filteredNews.filter(
        (article) =>
          article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filteredNews = filteredNews.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setVisibleNews(filteredNews);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleShowMore = () => {
    setShowAllNews(!showAllNews);
  };

  const renderNewsCards = () => {
    return visibleNews.map((article) => (
      <div key={article.id} className="news-card">
        <h2> {article.title}</h2>
        <p className="title" style={{ opacity: "0.7" }}>
          {article.content}
        </p>
        {/* <p>{article.dateAndTime}</p> */}
        {/* <p>{article.category}</p> */}
      </div>
    ));
  };

  return (
    <div>
      <div
        style={{ backgroundColor: " #223232", padding: "10px" }}
        className="container"
      >
        <div className="search-bar">
          <input
            style={{ width: "750px", justifyContent: "center" }}
            type="text"
            placeholder="Search news..."
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <h2
          style={{
            marginLeft: "25px",
            display: "flex",
            flexWrap: "wrap",
            color: "#33FF57",
          }}
        >
          TOP STORIES FOR YOU
        </h2>
        <div className="tags">
          <ul style={{ textAlign: "left", padding: "20px" }}>
            <li onClick={() => handleCategorySelection("ALL")}>ALL</li>
            &nbsp;
            <li onClick={() => handleCategorySelection("Business")}>
              Business
            </li>
            &nbsp;
            <li onClick={() => handleCategorySelection("Politics")}>
              Politics
            </li>
            &nbsp;
            <li onClick={() => handleCategorySelection("Sport")}>Sports</li>
            &nbsp;
            <li onClick={() => handleCategorySelection("Entertainment")}>
              Entertainment
            </li>
            &nbsp;
          </ul>
        </div>
        <div className="news-grid" style={{ padding: "25px" }}>
          {renderNewsCards()}
        </div>
        <br />
        <button onClick={handleShowMore} className="show-more-button">
          {showAllNews ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

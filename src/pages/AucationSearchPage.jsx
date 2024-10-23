import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AucationItem from "../components/AucationItem";
import api from "../utils/api"; // Assuming API calls are here

function AucationSearchPage() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Extract the query from the URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        const aucations = await api.getAllAucations(); // Get all auctions
        const filteredResults = aucations.filter((aucation) =>
          aucation.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <section
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        paddingTop: "30px",
      }}
    >
      {" "}
      <div className="container">
        <h2 className="my-4">Search Results for "{searchQuery}"</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {searchResults.map((aucation) => (
              <div key={aucation.id} className="col">
                <AucationItem aucation={aucation} />
              </div>
            ))}
          </div>
        ) : (
          <p>No results found for "{searchQuery}".</p>
        )}
      </div>{" "}
    </section>
  );
}

export default AucationSearchPage;

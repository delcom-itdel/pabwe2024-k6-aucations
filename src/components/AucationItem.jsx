import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AucationItem({ aucation }) {
  return (
    <div
      className="card shadow-sm"
      style={{
        height: "100%",
        minHeight: "400px",
        borderRadius: "15px", // Rounded corners for a soft look
        overflow: "hidden", // Ensure border-radius applies to image as well
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="card-img-top"
        style={{ height: "250px", overflow: "hidden" }}
      >
        <img
          src={aucation.cover}
          alt={aucation.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures image fills the area properly
          }}
        />
      </div>
      <div
        className="card-body d-flex flex-column"
        style={{ padding: "15px", gap: "10px" }}
      >
        <Link
          to={`/aucations/${aucation.id}`}
          className="flex-grow-1"
          style={{ textDecoration: "none" }}
        >
          <h5
            className="card-title"
            style={{ fontWeight: "bold", fontSize: "1.25rem", color: "#333" }}
          >
            {aucation.title}
          </h5>
        </Link>
        <p
          className="card-text"
          style={{
            fontSize: "0.9rem",
            color: "#555",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limit text to 2 lines
            overflow: "hidden",
            textOverflow: "ellipsis", // Add ellipsis when text overflows
            marginBottom: "10px",
          }}
        >
          {aucation.description}
        </p>
        <Link
          to={`/aucations/${aucation.id}`}
          style={{
            fontSize: "0.85rem",
            color: "#007bff",
            textDecoration: "underline",
            marginBottom: "10px",
          }}
        >
          See More
        </Link>
        <div style={{ fontSize: "0.95rem", marginBottom: "5px" }}>
          <span className="badge bg-info text-dark me-2">Starting Bid</span> Rp{" "}
          {aucation.start_bid.toLocaleString("id-ID")}
        </div>
        <div style={{ fontSize: "0.95rem", marginBottom: "5px" }}>
          <span className="badge bg-warning text-dark me-2">Closing Date</span>{" "}
          {new Date(aucation.closed_at).toLocaleDateString()}
        </div>
        <div style={{ fontSize: "0.95rem" }}>
          <span className="badge bg-secondary text-white me-2">Total Bids</span>{" "}
          {aucation.bids.length}
        </div>
      </div>
    </div>
  );
}

AucationItem.propTypes = {
  aucation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_bid: PropTypes.number.isRequired,
    closed_at: PropTypes.string.isRequired,
    cover: PropTypes.string,
    bids: PropTypes.array,
  }).isRequired,
};

export default AucationItem;

import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AucationDetail({
  aucation,
  highestBid,
  myBid,
  authLogin,
  handleDelete,
  handleCoverChange,
  handleChangeCover,
  handleAddBid,
  bidAmount,
  setBidAmount,
  handleDeleteBid,
}) {
  return (
    <div
      className="card shadow-sm mb-4"
      style={{ borderRadius: "12px", overflow: "hidden" }}
    >
      {/* Cover image with larger height and full width */}
      {aucation.cover && (
        <img
          src={aucation.cover}
          className="card-img-top"
          alt={aucation.title}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "350px",
          }}
        />
      )}
      <div className="card-body">
        {/* Title and description */}
        <h2
          className="text-primary mb-3"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {aucation.title}
        </h2>

        <p
          className="mb-3"
          style={{
            fontFamily: "Roboto, sans-serif",
            textAlign: "justify",
          }}
        >
          <span className="badge bg-info">Description</span>: {aucation.description}
        </p>

        <p className="mb-2">
          <span className="badge bg-primary">Starting Bid</span>: Rp{" "}
          {aucation.start_bid.toLocaleString("id-ID")}
        </p>

        <p className="mb-2">
          <span className="badge bg-warning">Closing Date</span>:{" "}
          {new Date(aucation.closed_at).toLocaleDateString()}
        </p>

        {/* Highest bid and user's bid */}
        {highestBid !== null && (
          <div className="alert alert-info">
            <strong>Highest Bid: </strong> Rp {highestBid.toLocaleString()}
          </div>
        )}

        {myBid !== null && (
          <div className="alert alert-success d-flex align-items-center">
            <div>
              <strong>Your Bid: </strong> Rp {myBid.toLocaleString()}
            </div>
            <button
              onClick={handleDeleteBid}
              className="btn btn-danger btn-sm ms-3"
            >
              Delete Bid <FaTrash />
            </button>
          </div>
        )}

        {/* Grouped Action buttons */}
        {authLogin && aucation.user_id === authLogin.id ? (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="d-flex align-items-center">
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-danger me-2"
              >
                <FaTrash /> Delete
              </button>
              <Link
                to={`/aucations/edit/${aucation.id}`}
                className="btn btn-primary me-2"
              >
                Edit
              </Link>
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="coverInput" className="form-label">
                Change Auction Cover:
              </label>
              <input
                type="file"
                className="form-control"
                id="coverInput"
                onChange={handleCoverChange}
              />
              <button
                onClick={handleChangeCover}
                className="btn btn-outline-primary mt-2"
              >
                Change Cover
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <h5>Add Bid</h5>
            <input
              type="number"
              className="form-control"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Masukkan jumlah tawaran"
            />
            <button onClick={handleAddBid} className="btn btn-success mt-2">
              Add Bid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

AucationDetail.propTypes = {
  aucation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_bid: PropTypes.number.isRequired,
    closed_at: PropTypes.string.isRequired,
    cover: PropTypes.string,
    user_id: PropTypes.string.isRequired,
    bids: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        bid: PropTypes.number.isRequired,
        // Tambahkan field lain jika diperlukan
      })
    ).isRequired,
    my_bid: PropTypes.shape({
      id: PropTypes.string.isRequired,
      bid: PropTypes.number.isRequired,
      // Tambahkan field lain jika diperlukan
    }),
  }).isRequired,
  highestBid: PropTypes.number,
  myBid: PropTypes.number,
  authLogin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    // Tambahkan field lain jika diperlukan
  }),
  handleDelete: PropTypes.func.isRequired,
  handleCoverChange: PropTypes.func.isRequired,
  handleChangeCover: PropTypes.func.isRequired,
  handleAddBid: PropTypes.func.isRequired,
  bidAmount: PropTypes.string.isRequired,
  setBidAmount: PropTypes.func.isRequired,
  handleDeleteBid: PropTypes.func.isRequired,
};

AucationDetail.defaultProps = {
  highestBid: null,
  myBid: null,
  authLogin: null,
};

export default AucationDetail;

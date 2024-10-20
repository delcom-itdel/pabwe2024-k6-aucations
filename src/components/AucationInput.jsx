import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import for navigation on cancel

function AucationInput({ onAddAucation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");
  const [cover, setCover] = useState(null);
  const navigate = useNavigate();

  const handleAddAucation = (event) => {
    event.preventDefault();
    const fullClosureTime = `${closedAt} 23:59:59`;

    if (title.trim() && description.trim() && startBid && closedAt && cover) {
      onAddAucation({
        title,
        description,
        start_bid: startBid,
        closed_at: fullClosureTime,
        cover,
      });
    } else {
      alert("All fields are required, including the cover image.");
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    setCover(file);
    console.log("Selected file:", file);
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back
  };

  return (
    <div className="card shadow-lg" style={{ borderRadius: "0.75rem" }}>
      <div className="card-header bg-success text-white text-center" style={{ borderRadius: "0.75rem 0.75rem 0 0" }}>
        <h3 className="card-title">Create New Aucation</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleAddAucation}>
        <div className="mb-3">
            <label htmlFor="inputCover" className="form-label">
              Cover Image
            </label>
            <input
              type="file"
              id="inputCover"
              accept="image/*"
              onChange={handleCoverChange}
              className="form-control"
              required
            />
            {cover && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(cover)}
                  alt="Cover Preview"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="inputTitle"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              placeholder="Enter aucation title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputDescription" className="form-label">
              Description
            </label>
            <textarea
              id="inputDescription"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              rows="4"
              placeholder="Enter aucation description"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="inputStartBid" className="form-label">
              Start Bid (in Rupiah)
            </label>
            <input
              type="number"
              id="inputStartBid"
              onChange={(e) => setStartBid(e.target.value)}
              value={startBid}
              className="form-control"
              placeholder="Enter starting bid"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputClosedAt" className="form-label">
              Closed At
            </label>
            <input
              type="date"
              id="inputClosedAt"
              onChange={(e) => setClosedAt(e.target.value)}
              value={closedAt}
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" onClick={handleCancel} className="btn btn-danger">
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AucationInput.propTypes = {
  onAddAucation: PropTypes.func.isRequired,
};

export default AucationInput;
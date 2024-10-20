import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDetailAucation,
  asyncEditAucation,
} from "../states/aucations/action";

function AucationEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { detailAucation } = useSelector((state) => state);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAucation(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (detailAucation) {
      setTitle(detailAucation.title);
      setDescription(detailAucation.description);
      setStartBid(detailAucation.start_bid);
      setClosedAt(detailAucation.closed_at);
    }
  }, [detailAucation]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      asyncEditAucation(
        { id, title, description, start_bid: startBid, closed_at: closedAt },
        navigate
      )
    );
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div
        className="card"
        style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)", padding: "20px" }}
      >
        <h2 style={{ textAlign: "center" }}>Update Aucation</h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="formTitle"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Title
          </label>
          <input
            id="formTitle"
            type="text"
            placeholder="Enter auction title"
            value={title}
            onChange={handleInputChange(setTitle)}
            required
            style={inputStyle}
          />

          <label
            htmlFor="formDescription"
            style={{ display: "block", marginBottom: "5px" }}
          >
           Description
          </label>
          <textarea
            id="formDescription"
            rows="3"
            placeholder="Enter auction description"
            value={description}
            onChange={handleInputChange(setDescription)}
            required
            style={{ ...inputStyle, height: "auto" }}
          />

          <label
            htmlFor="formStartBid"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Start Bid
          </label>
          <input
            id="formStartBid"
            type="number"
            placeholder="Enter starting bid amount"
            value={startBid}
            onChange={handleInputChange(setStartBid)}
            required
            style={inputStyle}
          />

          <label
            htmlFor="formClosedAt"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Closing Date
          </label>
          <input
            id="formClosedAt"
            type="datetime-local"
            value={closedAt}
            onChange={handleInputChange(setClosedAt)}
            required
            style={inputStyle}
          />

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AucationEditPage;

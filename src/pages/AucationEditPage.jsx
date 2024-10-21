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

  return (
    <div className="container mt-5 mb-5">
      <div
        className="card shadow-lg mx-auto"
        style={{ maxWidth: "1200px", borderRadius: "0.75rem" }}
      >
        <div
          className="card-header bg-success text-white text-center"
          style={{ borderRadius: "0.75rem 0.75rem 0 0" }}
        >
          <h3 className="card-title">Update Auction</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formTitle" className="form-label">
                Judul Auction
              </label>
              <input
                id="formTitle"
                type="text"
                placeholder="Masukkan judul auction"
                value={title}
                onChange={handleInputChange(setTitle)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formDescription" className="form-label">
                Deskripsi Auction
              </label>
              <textarea
                id="formDescription"
                rows="3"
                placeholder="Masukkan deskripsi auction"
                value={description}
                onChange={handleInputChange(setDescription)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formStartBid" className="form-label">
                Start Bid (in Rupiah)
              </label>
              <input
                id="formStartBid"
                type="number"
                placeholder="Masukkan nilai start bid"
                value={startBid}
                onChange={handleInputChange(setStartBid)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formClosedAt" className="form-label">
                Tanggal Penutupan
              </label>
              <input
                id="formClosedAt"
                type="datetime-local"
                value={closedAt}
                onChange={handleInputChange(setClosedAt)}
                required
                className="form-control"
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AucationEditPage;

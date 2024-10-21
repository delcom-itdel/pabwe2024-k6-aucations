import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2"; // SweetAlert for confirmation dialogs
import React from "react";

import {
  asyncDetailAucation,
  asyncDeleteAucation,
  asyncChangeAucationCover,
  asyncAddBid,
  asyncDeleteBid,
} from "../states/aucations/action";

import { FaTrash } from "react-icons/fa6";

function AucationDetailPage() {
  // Initialize hooks and variables
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCover, setSelectedCover] = React.useState(null);
  const [bidAmount, setBidAmount] = React.useState("");

  // Extract necessary data from Redux store
  const { authLogin, detailAucation, loading } = useSelector((state) => ({
    detailAucation: state.detailAucation,
    loading: state.loading,
    authLogin: state.authLogin,
  }));

  // Fetch aucation details when component mounts or id changes
  React.useEffect(() => {
    if (id) {
      dispatch(asyncDetailAucation(id));
    }
  }, [id, dispatch]);

  // Calculate highest bid and user's bid
  const highestBid = detailAucation?.bids.length
    ? Math.max(...detailAucation.bids.map((bid) => bid.bid))
    : null;

  const myBid = detailAucation?.my_bid ? detailAucation.my_bid.bid : null;

  // Handler to delete the aucation
  const handleDelete = () => {
    Swal.fire({
      title: "Delete",
      text: `Are you sure you want to delete the auction: ${detailAucation.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete It",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncDeleteAucation(id))
          .then(() => {
            // Tampilkan popup jika berhasil dihapus
            Swal.fire("Succes!", "The auction has been successfully deleted.", "success");
            navigate("/"); // Kembali ke halaman utama setelah penghapusan
          })
          .catch((error) => {
            // Tampilkan popup jika ada kesalahan saat menghapus
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };
  

  // Handler for cover file selection
  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedCover(file);
    }
  };

  // Handler to change the aucation cover
const handleChangeCover = () => {
  if (selectedCover) {
    dispatch(asyncChangeAucationCover({ id, cover: selectedCover }))
      .then(() => {
        Swal.fire("Success", "Auction cover updated successfully", "success");
        navigate("/"); // Return to the homepage after success
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  } else {
    Swal.fire("Error", "Please select a cover to upload", "error");
  }
};


// Handler to add a bid
const handleAddBid = async () => {
  // Validasi apakah bidAmount kosong atau hanya spasi
  if (!bidAmount || bidAmount.trim() === "") {
   Swal.fire("Error", "Bid amount cannot be empty", "error");
   return;
 }
 const bidValue = parseFloat(bidAmount);

 if (bidValue <= 0) {
   Swal.fire("Error", "Please enter a valid bid amount", "error");
 } else if (detailAucation.bids.length === 0 && bidValue < detailAucation.start_bid) {
   // If no bid exists and bid is lower than the start bid
   Swal.fire("Error", `Your bid must be higher than the starting bid of Rp ${detailAucation.start_bid.toLocaleString("id-ID")}`, "error");
 } else if (highestBid !== null && bidValue <= highestBid) {
   // If a bid exists and the bid value is lower than or equal to the highest bid
   Swal.fire("Error", `Your bid must be higher than the current highest bid of Rp ${highestBid.toLocaleString("id-ID")}`, "error");
 } else {
   await dispatch(asyncAddBid({ id, bid: bidValue }));
   Swal.fire("Success", "Bid successfully added", "success");
   await dispatch(asyncDetailAucation(id)); // Reload auction details
 }
};


  // Handler to delete the user's bid
  const handleDeleteBid = () => {
    Swal.fire({
      title: "Delete Bid",
      text: `Are you sure you want to delete your bid on this auction?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Bid",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncDeleteBid({ id }));
      }
    });
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="container pt-3">
        {detailAucation ? (
          <>
            <div className="card shadow-sm mb-4" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              {/* Cover image with larger height and full width */}
              {detailAucation.cover && (
                <img
                  src={detailAucation.cover}
                  className="card-img-top"
                  alt={detailAucation.title}
                  style={{ objectFit: "contain", width: "100%", height: "350px" }}
                />
              )}
              <div className="card-body">
                {/* Title and description */}
                <h2 className="text-primary mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {detailAucation.title}
                </h2>

                <p className="mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <span className="badge bg-info">Description</span>: {detailAucation.description}
                </p>

                <p className="mb-2">
                  <span className="badge bg-primary">Starting Bid</span>: Rp {detailAucation.start_bid.toLocaleString("id-ID")}
                </p>

                <p className="mb-2">
                  <span className="badge bg-warning">Closing Date</span>: {new Date(detailAucation.closed_at).toLocaleDateString()}
                </p>

                {/* Highest bid and user's bid */}
                {highestBid !== null && (
                  <div className="alert alert-info">
                    <strong>Highest Bid: </strong> Rp {highestBid.toLocaleString()}
                  </div>
                )}

                {myBid !== null && (
                  <div className="alert alert-success">
                    <strong>Your Bid: </strong> Rp {myBid.toLocaleString()}
                    <button
                      onClick={handleDeleteBid}
                      className="btn btn-danger btn-sm ms-2"
                    >
                      Delete Bid
                    </button>
                  </div>
                )}

                {/* Grouped Action buttons */}
                {authLogin && detailAucation.user_id === authLogin.id ? (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger me-2"
                      >
                        <FaTrash>
                        </FaTrash> Delete 
                      </button>
                      <Link
                        to={`/aucations/edit/${id}`}
                        className="btn btn-primary me-2"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="d-flex flex-column">
                      <label htmlFor="coverInput" className="form-label">Change Auction Cover:</label>
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
          </>
        ) : (
          <div className="alert alert-danger">Aucation not found.</div>
        )}
      </div>
    </section>
  );
}

export default AucationDetailPage;
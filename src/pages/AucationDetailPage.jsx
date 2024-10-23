// action.js dan reducer.js sudah dijelaskan sebelumnya dan diasumsikan sudah terpisah dengan benar

import { useParams, useNavigate } from "react-router-dom";
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

import AucationDetail from "../components/AucationDetail"; // Pastikan path ini sesuai dengan struktur folder Anda

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
            // Show success popup
            Swal.fire(
              "Success!",
              "The auction has been successfully deleted.",
              "success"
            );
            navigate("/"); // Redirect to homepage after deletion
          })
          .catch((error) => {
            // Show error popup
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
    // Validate if bidAmount is empty or just spaces
    if (!bidAmount || bidAmount.trim() === "") {
      Swal.fire("Error", "Bid amount cannot be empty", "error");
      return;
    }
    const bidValue = parseFloat(bidAmount);

    // Check if auction is closed (past the closing date)
    const today = new Date();
    const closedDate = new Date(detailAucation.closed_at);

    if (closedDate < today) {
      Swal.fire(
        "Error",
        "This auction is closed. You cannot place a bid.",
        "error"
      );
      return;
    }

    if (bidValue <= 0) {
      Swal.fire("Error", "Please enter a valid bid amount", "error");
    } else if (
      detailAucation.bids.length === 0 &&
      bidValue < detailAucation.start_bid
    ) {
      // If no bid exists and bid is lower than the start bid
      Swal.fire(
        "Error",
        `Your bid must be higher than the starting bid of Rp ${detailAucation.start_bid.toLocaleString(
          "id-ID"
        )}`,
        "error"
      );
    } else if (highestBid !== null && bidValue <= highestBid) {
      // If a bid exists and the bid value is lower than or equal to the highest bid
      Swal.fire(
        "Error",
        `Your bid must be higher than the current highest bid of Rp ${highestBid.toLocaleString(
          "id-ID"
        )}`,
        "error"
      );
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
        dispatch(asyncDeleteBid({ id }))
          .then(() => {
            Swal.fire("Success", "Bid deleted successfully", "success");
            dispatch(asyncDetailAucation(id)); // Reload auction details after deleting bid
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
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
          <AucationDetail
            aucation={detailAucation}
            highestBid={highestBid}
            myBid={myBid}
            authLogin={authLogin}
            handleDelete={handleDelete}
            handleCoverChange={handleCoverChange}
            handleChangeCover={handleChangeCover}
            selectedCover={selectedCover}
            handleAddBid={handleAddBid}
            bidAmount={bidAmount}
            setBidAmount={setBidAmount}
            handleDeleteBid={handleDeleteBid}
          />
        ) : (
          <div className="alert alert-danger">Aucation not found.</div>
        )}
      </div>
    </section>
  );
}

export default AucationDetailPage;

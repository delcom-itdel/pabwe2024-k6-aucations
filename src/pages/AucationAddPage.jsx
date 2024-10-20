import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddAucation,
  addAucationActionCreator,
} from "../states/aucations/action"; // Import actions for Aucation
import AucationInput from "../components/AucationInput"; // Input form component for Aucation
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal for alert messages

const AucationAddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve the isAddAucation status from the Redux store
  const isAddAucation = useSelector((state) => state.isAddAucation) || false;

  // Effect hook to handle side effects when isAddAucation changes
  useEffect(() => {
    if (isAddAucation) {
      // Display a success message when a new aucation is added
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Auction successfully added!",
        showConfirmButton: false,
        timer: 700,
      });
      // Reset the add aucation status
      dispatch(addAucationActionCreator(false));
    }
  }, [isAddAucation, dispatch]);

  // Handler function to dispatch the asyncAddAucation action
  const handleAddAucation = (aucationData) => {
    dispatch(asyncAddAucation(aucationData, navigate));
  };

  return (
    <section>
      <div className="container pt-1">
        {/* Render the AucationInput component and pass the handler */}
        <AucationInput onAddAucation={handleAddAucation} />
      </div>
    </section>
  );
};

export default AucationAddPage;

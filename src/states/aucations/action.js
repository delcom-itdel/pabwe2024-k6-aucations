import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";
import Swal from "sweetalert2";

const ActionType = {
  GET_AUCATIONS: "GET_AUCATIONS",
  ADD_AUCATION: "ADD_AUCATION",
  DELETE_AUCATION: "DELETE_AUCATION",
  DETAIL_AUCATION: "DETAIL_AUCATION",
  ADD_BID: "ADD_BID",
};

// Action creators
const getAucationsActionCreator = (aucations) => ({
  type: ActionType.GET_AUCATIONS,
  payload: { aucations },
});

const addAucationActionCreator = (status) => ({
  type: ActionType.ADD_AUCATION,
  payload: { status },
});

const deleteAucationActionCreator = (status) => ({
  type: ActionType.DELETE_AUCATION,
  payload: { status },
});

const detailAucationActionCreator = (aucation) => ({
  type: ActionType.DETAIL_AUCATION,
  payload: { aucation },
});

const addBidActionCreator = (bid) => ({
  type: ActionType.ADD_BID,
  payload: { bid },
});

// Asynchronous actions
const asyncGetAucations = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const aucations = await api.getAllAucations();
    console.log("Aucations fetched from API:", aucations);
    dispatch(getAucationsActionCreator(aucations));
  } catch (error) {
    console.error("Error fetching aucations:", error);
    showErrorDialog(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncAddAucation = (
  { title, description, start_bid, closed_at, cover },
  navigate
) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.postAddAucation({
      title,
      description,
      start_bid,
      closed_at,
      cover,
    });
    dispatch(addAucationActionCreator(true));
    navigate("/"); // Redirect ke halaman utama setelah berhasil menambahkan
  } catch (error) {
    showErrorDialog(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncDeleteAucation = (id) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.deleteAucation(id);
    dispatch(deleteAucationActionCreator(true));
  } catch (error) {
    showErrorDialog(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncDetailAucation = (id) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const aucation = await api.getDetailAucation(id);
    dispatch(detailAucationActionCreator(aucation));
  } catch (error) {
    showErrorDialog(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncEditAucation = (
  { id, title, description, start_bid, closed_at },
  navigate
) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.putUpdateAucation({
      id,
      title,
      description,
      start_bid,
      closed_at,
    });
    dispatch(asyncDetailAucation(id)); // Memuat ulang detail aucation yang telah diedit
    Swal.fire("Success", "Aucation updated successfully", "success");
    navigate("/"); // Kembali ke halaman utama setelah update berhasil
  } catch (error) {
    showErrorDialog(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncChangeAucationCover = ({ id, cover }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.postChangeAucationCover({ id, cover });
    dispatch(asyncDetailAucation(id)); // Memuat ulang detail aucation setelah mengubah cover
    Swal.fire("Success", "Cover updated successfully", "success");
  } catch (error) {
    showErrorDialog(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncAddBid = ({ id, bid }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.postAddBid({ id, bid });
    Swal.fire("Success", "Berhasil memberikan tawaran pada lelang", "success");
    dispatch(addBidActionCreator({ id, bid }));
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    showErrorDialog(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

const asyncDeleteBid = ({ id }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.deleteBid({ id });
    Swal.fire("Success", "Berhasil menghapus tawaran pada lelang", "success");
    dispatch(asyncDetailAucation(id)); // Memuat ulang detail aucation setelah menghapus bid
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    showErrorDialog(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export {
  ActionType,
  getAucationsActionCreator,
  asyncGetAucations,
  addAucationActionCreator,
  asyncAddAucation,
  deleteAucationActionCreator,
  asyncDeleteAucation,
  detailAucationActionCreator,
  asyncDetailAucation,
  asyncEditAucation,
  asyncChangeAucationCover,
  asyncAddBid,
  asyncDeleteBid,
};
import { ActionType } from "./action";

function aucationsReducer(aucations = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_AUCATIONS:
      console.log("payload status", action.payload.aucations);
      return action.payload.aucations;
    default:
      return aucations;
  }
}

function isAddAucationReducer(status = false, action = {}) {
  console.log("Callback Reducer", action);
  switch (action.type) {
    case ActionType.ADD_AUCATION:
      return action.payload.status;
    default:
      return status;
  }
}

function isDeleteAucationReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_AUCATION:
      return action.payload.status;
    default:
      return status;
  }
}

function detailAucationReducer(aucation = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_AUCATION:
      return action.payload.aucation;

    case ActionType.ADD_BID:
      return {
        ...aucation,
        bids: [...aucation.bids, action.payload.bid], // Tambahkan bid baru ke dalam array bids
      };

    default:
      return aucation;
  }
}

export {
  aucationsReducer,
  isAddAucationReducer,
  isDeleteAucationReducer,
  detailAucationReducer,
};
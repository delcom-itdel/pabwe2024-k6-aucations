import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";

// Import reducers untuk autentikasi dan profil
import isAuthRegisterReducer from "./isAuthRegister/reducer";
import authLoginReducer from "./authLogin/reducer";
import isPreloadReducer from "./isPreload/reducer";
import isUserChangePhotoReducer from "./isUserChangePhoto/reducer";

// Import reducers untuk aucation
import {
  aucationsReducer,
  isAddAucationReducer,
  isDeleteAucationReducer,
  detailAucationReducer,
} from "./aucations/reducer"; // Sesuaikan path jika diperlukan

// Menggabungkan semua reducers ke dalam satu objek
const rootReducer = {
  // Reducers untuk autentikasi
  isAuthRegister: isAuthRegisterReducer,
  authLogin: authLoginReducer,
  isPreload: isPreloadReducer,
  loadingBar: loadingBarReducer,

  // Reducer untuk profil pengguna
  isUserChangePhoto: isUserChangePhotoReducer,

  // Reducers untuk aucation
  aucations: aucationsReducer, // Tambahkan ini
  isAddAucation: isAddAucationReducer, // Tambahkan ini
  isDeleteAucation: isDeleteAucationReducer, // Tambahkan ini
  detailAucation: detailAucationReducer, // Tambahkan ini
};

// Membuat store Redux dengan menggunakan rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;

import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import tindakan dan komponen yang diperlukan
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthLogin } from "./states/authLogin/action";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";

// Import halaman
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import AucationAddPage from "./pages/AucationAddPage"; 
import AucationDetailPage from "./pages/AucationDetailPage"; 
import AucationEditPage from "./pages/AucationEditPage"; 

function App() {
  // Mengambil state dari Redux store
  const { authLogin = null, isPreload = false } = useSelector((state) => state);

  const location = useLocation();
  const dispatch = useDispatch();

  // Proses preload saat aplikasi dimulai
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  // Fungsi untuk menangani sign out
  const onAuthSignOut = () => {
    dispatch(asyncUnsetAuthLogin());
  };

  // Jika preload masih berlangsung, jangan render apa pun
  if (isPreload) {
    return null;
  }

  // Jika pengguna belum terautentikasi
  if (authLogin === null) {
    const activeRegister = location.pathname === "/register" ? "active" : "";
    const activeLogin = location.pathname !== "/register" ? "active" : "";

    return (
      <div>
        <header className="fixed-top">
          <Loading />
        </header>
        <div className="w-300px mx-auto mt-5">
          <div className="card shadow-sm">
            <div className="text-center py-2">
              <h2>Forum App</h2>
            </div>
            <ul className="nav nav-pills mb-3">
              <li className="nav-item w-50 text-center">
                <Link className={`nav-link ${activeLogin} btl`} to="/">
                  Login
                </Link>
              </li>
              <li className="nav-item w-50 text-center">
                <Link
                  className={`nav-link ${activeRegister} btl`}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  // Jika pengguna sudah terautentikasi
  return (
    <React.Fragment>
      <div>
        <header className="fixed-top">
          <Navigation authLogin={authLogin} onAuthSignOut={onAuthSignOut} />
          <Loading />
        </header>
        <main className="margin-main">
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/users/me" element={<ProfilePage />} />
            <Route path="/aucations/add" element={<AucationAddPage />} />
            <Route path="/aucations/:id" element={<AucationDetailPage />} />
            <Route path="/aucations/edit/:id" element={<AucationEditPage />} />
          </Routes>
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;

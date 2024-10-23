import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaRightFromBracket } from "react-icons/fa6";
import { useState } from "react";

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Redirect to search page
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand custom-navbar-brand" to="/">
          Auction App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navApp"
          aria-controls="navApp"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navApp">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Search Form */}
            <li className="nav-item">
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-2 custom-input"
                  type="search"
                  placeholder="Search by title"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <button className="btn btn-outline-success custom-btn" type="submit">
                  Search
                </button>
              </form>
            </li>

            {/* Add Auction Button */}
            <li className="nav-item">
              <Link className="btn btn-primary custom-btn ms-2" to="/aucations/add">
                Add Auction
              </Link>
            </li>

            {/* User Profile Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link mx-2 dropdown-toggle"
                href="#"
                id="navUser"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="nav-profile rounded-circle"
                  src={photo}
                  alt={id}
                  title={name}
                  style={{ width: "40px", height: "40px" }}
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-end custom-dropdown-menu" aria-labelledby="navUser">
                <li>
                  <Link className="dropdown-item custom-dropdown-item" to="/users/me">
                    <FaUser className="me-2" /> Profile
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item custom-dropdown-item"
                    onClick={onAuthSignOut}
                  >
                    <FaRightFromBracket className="me-2" /> Sign out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  authLogin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  onAuthSignOut: PropTypes.func.isRequired,
};

export default Navigation;

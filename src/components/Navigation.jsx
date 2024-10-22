import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaRightFromBracket } from "react-icons/fa6";
import { useState } from "react";

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand custom-navbar-brand" to="/">
            Aucation App
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
            <ul className="navbar-nav ms-auto align-items-center d-flex">
              {/* Search Form */}
              <li className="nav-item d-flex align-items-center me-3">
                {" "}
                {/* Flex container for better alignment */}
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search by title"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={{
                      borderRadius: "4px",
                      padding: "0.375rem 0.75rem",
                    }}
                  />
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    style={{
                      borderRadius: "4px",
                      padding: "0.375rem 0.75rem",
                    }}
                  >
                    Search
                  </button>
                </form>
              </li>
              {/* Add Auction Button */}
              <li className="nav-item me-2">
                <Link className="btn custom-btn" to="/aucations/add">
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
                    className="nav-profile"
                    src={photo}
                    alt={id}
                    title={name}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end custom-dropdown-menu"
                  aria-labelledby="navUser"
                >
                  <li>
                    <Link
                      className="dropdown-item custom-dropdown-item"
                      to="/users/me"
                    >
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item custom-dropdown-item"
                      onClick={onAuthSignOut}
                    >
                      <FaRightFromBracket /> Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
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

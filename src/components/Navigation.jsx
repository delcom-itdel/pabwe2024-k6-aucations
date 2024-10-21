import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUser, FaRightFromBracket } from "react-icons/fa6";

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;

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
            <ul className="navbar-nav ms-auto">
              <li className="mt-2 me-2">
                <Link
                  className="btn custom-btn"
                  to="/aucations/add"
                >
                  Add Aucations
                </Link>
              </li>
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
                    <Link className="dropdown-item custom-dropdown-item" to="/users/me">
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

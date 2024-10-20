import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUser, FaRightFromBracket } from "react-icons/fa6"; // Menghapus FaPlus

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;

  // Custom styles for the navigation components
  const styles = {
    navbar: {
      backgroundColor: "#72BF78", // Warna hijau utama
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s",
      borderRadius: "10px", // Tambahkan border-radius untuk navbar agar melengkung
    },
    navbarBrand: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1.8rem", // Sedikit memperbesar ukuran font
      fontFamily: "Poppins, sans-serif", // Gunakan font yang modern
    },
    button: {
      backgroundColor: "#257180", // Warna tombol hijau lebih cerah
      color: "#fff",
      border: "none",
      borderRadius: "25px", // Tombol melengkung lebih besar
      padding: "0.7rem 1.5rem", // Ukuran tombol lebih besar
      marginRight: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      fontSize: "1rem", // Perbesar ukuran teks
      fontWeight: "600", // Tambah ketebalan font
      transition: "all 0.3s",
    },
    buttonHover: {
      backgroundColor: "#4E8C8F", // Warna hijau lebih gelap saat hover
    },
    profileImg: {
      borderRadius: "50%",
      border: "3px solid #257180", // Border hijau yang lebih mencolok
      width: "40px",
      height: "40px",
    },
    dropdownMenu: {
      backgroundColor: "#257180",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    },
    dropdownItem: {
      color: "#fff",
      padding: "10px 20px",
      textDecoration: "none",
      fontFamily: "Roboto, sans-serif",
      transition: "background-color 0.2s",
    },
    dropdownItemHover: {
      backgroundColor: "#5AA667",
    },
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={styles.navbar}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={styles.navbarBrand}>
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
            style={{ borderColor: "#fff" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto">
              <li className="mt-2 me-2">
                <Link
                  className="btn"
                  to="/aucations/add"
                  style={styles.button}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      styles.buttonHover.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      styles.button.backgroundColor)
                  }
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
                  style={{ color: "#fff", fontSize: "1rem" }}
                >
                  <img
                    className="nav-profile"
                    src={photo}
                    alt={id}
                    title={name}
                    style={styles.profileImg}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navUser"
                  style={styles.dropdownMenu}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/users/me"
                      style={styles.dropdownItem}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.dropdownItemHover.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={onAuthSignOut}
                      style={styles.dropdownItem}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.dropdownItemHover.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
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

// Define the shape of the authLogin prop for validation
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

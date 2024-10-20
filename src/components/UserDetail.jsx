import { useRef } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/tools";
import { FaUpload } from "react-icons/fa6";

function UserDetail({ authLogin, onUserChangePhoto }) {
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Membuat URL sementara untuk foto baru
      const newPhotoUrl = URL.createObjectURL(file);
      onUserChangePhoto({ photoFile: file, newPhotoUrl });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div id={authLogin.id} className="card">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="d-flex">
              <div>
                <img
                  className="rounded-circle"
                  width={76}
                  height={76}
                  src={authLogin.photo}
                  alt="Profile"
                />
              </div>
              <div className="ms-3">
                <h3 className="text-primary">{authLogin.name}</h3>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleUploadClick}
                >
                  <FaUpload /> Change Profile Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="d-none"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <hr />
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{authLogin.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{authLogin.email}</td>
                </tr>
                <tr>
                  <th>Joined since</th>
                  <td>{formatDate(authLogin.created_at)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

UserDetail.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onUserChangePhoto: PropTypes.func.isRequired,
};

export { authLoginShape };
export default UserDetail;

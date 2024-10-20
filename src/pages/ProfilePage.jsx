import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDetail from "../components/UserDetail";
import {
  asyncSetIsUserChangePhoto,
  setIsUserChangePhotoActionCreator,
} from "../states/isUserChangePhoto/action";
import Swal from "sweetalert2";

function ProfilePage() {
  const dispatch = useDispatch();
  const { authLogin, isUserChangePhoto = false } = useSelector(
    (states) => states
  );

  // Tambahkan state untuk foto baru
  const [profilePhoto, setProfilePhoto] = useState(authLogin.photo);

  useEffect(() => {
    if (isUserChangePhoto) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil mengubah photo profile!",
        showConfirmButton: false,
        timer: 1200,
      });
      dispatch(setIsUserChangePhotoActionCreator(false));
    }
  }, [isUserChangePhoto, dispatch]);

  const onUserChangePhoto = ({ photoFile, newPhotoUrl }) => {
    // Perbarui state foto profil dengan URL baru
    setProfilePhoto(newPhotoUrl);
    // Dispatch action untuk upload foto ke server
    dispatch(asyncSetIsUserChangePhoto({ photoFile }));
  };

  return (
    <section>
      <div className="container pt-1">
        <UserDetail
          authLogin={{ ...authLogin, photo: profilePhoto }} // Kirim foto baru ke UserDetail
          onUserChangePhoto={onUserChangePhoto}
        />
      </div>
    </section>
  );
}

export default ProfilePage;

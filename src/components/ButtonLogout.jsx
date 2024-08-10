import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/userSlice";
import { useSelector } from "react-redux";

const ButtonLogout = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const handleLogout = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${userInfo.token ?? ""}`,
          },
        }
      )
      .then((res) => {
        dispatch(logout());
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="px-3 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};
export default ButtonLogout;
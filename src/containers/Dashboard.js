import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import authAtom from "../recoil/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  return (
    <button
      onClick={() => {
        setAuth(null);
        localStorage.removeItem("magix-support-auth-tokens");
        navigate("/");
      }}
    >
      logout
    </button>
  );
};

export default Dashboard;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import UserService from "@services/user";

export default function Logout() {
  const { setLoggedUser } = useLoggedUser();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await UserService.logout();
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
   
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
    
        navigate("/", { replace: true });
      }
    };

    doLogout();
  }, [setLoggedUser, navigate]);

  return null; 
}

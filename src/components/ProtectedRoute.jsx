import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user);
    if (user === null) {
      navigate("/login", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return children;
}

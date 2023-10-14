import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: any;
  };
  
const PrivateRoute = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) navigate("/");
  }, [navigate]);
  return children;
};

export default PrivateRoute;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: any;
};

const PublicRoute = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) navigate("/home");
  }, []);

  return children;
};

export default PublicRoute;

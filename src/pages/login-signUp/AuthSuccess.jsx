import { useEffect } from "react";
import { useNavigate } from "react-router";


export default function AuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return <p>Logging you in...</p>;
}
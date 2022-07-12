import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RedirectProps = {
  to: string;
};

const Redirect = ({ to }: RedirectProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, []);
  return <></>;
};

export default Redirect;

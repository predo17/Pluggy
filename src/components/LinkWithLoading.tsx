import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";

interface Props {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

export default function LinkWithLoading({ to, className, children }: Props) {
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    startLoading();
    
    // Uma pequena pausa para animação aparecer
    await new Promise(res => setTimeout(res, 1000));
    
    navigate(to);
    stopLoading();
  }

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

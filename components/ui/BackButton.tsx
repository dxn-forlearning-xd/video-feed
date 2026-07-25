import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

export const BackButton = ({ onClick, className = "" }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-full hover:bg-zinc-800 transition text-white ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
};

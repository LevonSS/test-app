import React, { ReactNode } from "react";

interface Props {
  action?: () => void;
  type?: string;
  loading?: boolean;
  children: ReactNode;
}
const Button = ({ action, loading, children }: Props) => {
  return (
    <button
      onClick={action}
      disabled={loading}
      className="mt-3 w-full text-4xl bg-[#222222] text-white py-3.5 rounded-2xl hover:bg-gray-800 transition cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;

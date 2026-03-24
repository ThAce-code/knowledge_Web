import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick, className }) => {
  return (
    <button className={className ? `btn-17 ${className}` : "btn-17"} onClick={onClick}>
      <span className="text-container">
        <span className="text">{children}</span>
      </span>
    </button>
  );
}

export default AnimatedButton;

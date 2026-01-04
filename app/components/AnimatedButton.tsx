import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick }) => {
  return (
    <button className="btn-17" onClick={onClick}>
      <span className="text-container">
        <span className="text">{children}</span>
      </span>
    </button>
  );
}

export default AnimatedButton;

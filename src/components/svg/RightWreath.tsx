import React from 'react';
import LeftWreath from './LeftWreath';

interface RightWreathProps {
  className?: string;
  color?: string;
}

const RightWreath: React.FC<RightWreathProps> = ({ 
  className = '',
  color = '#373737'
}) => {
  return (
    <div className={`transform scale-x-[-1] ${className}`}>
      <LeftWreath color={color} />
    </div>
  );
};

export default RightWreath;
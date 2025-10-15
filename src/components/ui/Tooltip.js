// src/components/ui/Tooltip.js

import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ children, text, position = 'top', isOpen = false, trigger = 'hover' }) => {
  // Estado interno solo para el hover
  const [isHoverVisible, setIsHoverVisible] = useState(false);

  // El tooltip será visible si:
  // 1. La prop 'isOpen' es verdadera (controlado desde fuera).
  // O 2. El usuario está haciendo hover Y el modo es 'hover'.
  const isVisible = isOpen || (trigger === 'hover' && isHoverVisible);

  const showTooltip = () => {
    if (trigger === 'hover') {
      setIsHoverVisible(true);
    }
  };

  const hideTooltip = () => {
    if (trigger === 'hover') {
      setIsHoverVisible(false);
    }
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <div className={`tooltip-box tooltip-${position} ${isVisible ? 'visible' : ''}`}>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
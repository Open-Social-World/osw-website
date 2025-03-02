"use client";

import React, { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

// Define props interface extending HTML span attributes
interface EmphasizedSpanProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: string;
}

// Basic functional component
const EmphasizedSpan: React.FC<EmphasizedSpanProps> = ({ 
  children, 
  ...props 
}) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    const checkPosition = (): void => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if element is centered in viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportLowerCenter = windowHeight * 0.55;

      setIsInView(elementCenter < viewportLowerCenter);
    };

    window.addEventListener("scroll", checkPosition);
    // Check on resize too as viewport center might change
    window.addEventListener("resize", checkPosition);
    checkPosition(); // Initial check

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, []);

  // Apply active or inactive classes based on center position
  const textClass = isInView
    ? `text-primary`
    : ``;

  return (
    <span
      ref={elementRef}
      className={`transition-all duration-500 ${textClass}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default EmphasizedSpan;
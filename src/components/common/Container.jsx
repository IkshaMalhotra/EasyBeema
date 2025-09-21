import React from 'react';

/**
 * Standard page container used across sections to ensure consistent
 * horizontal padding and max-width. Keeps mobile-first padding of
 * `px-4 sm:px-6 lg:px-14` by default but accepts `className` to
 * allow layout-specific tweaks (e.g. vertical padding, flex utilities).
 */
const Container = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 ${className}`.trim()}>
      {children}
    </div>
  );
};

export default Container;

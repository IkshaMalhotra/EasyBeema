import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Reusable Button component with three variants:
 * - primary:   solid blue  (main CTAs)
 * - secondary: outlined    (secondary actions)
 * - ghost:     transparent (subtle actions)
 *
 * Uses twMerge to safely merge Tailwind classes without conflicts.
 */
const Button = ({
  text = "Click",
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  children,
  onClick,
  type = "button",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#019de3] text-white hover:bg-[#0289c7] focus:ring-[#019de3] shadow-sm",
    secondary:
      "border border-[#019de3] text-[#019de3] bg-white hover:bg-[#f0faff] focus:ring-[#019de3]",
    ghost:
      "bg-transparent text-[#019de3] hover:bg-[#f0faff] focus:ring-[#019de3]",
  };

  const sizes = {
    small: "text-sm px-4 py-2",
    medium: "text-base px-6 py-3",
    large: "text-lg px-8 py-4",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        base,
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.medium,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;

import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const textAreaClasses = cva(
  'w-full resize-vertical transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'focus:ring-blue-500',
        error: 'border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:ring-green-500',
      },
      size: {
        small: 'text-sm px-3 py-2 min-h-[60px]',
        medium: 'text-base px-4 py-3 min-h-[80px]',
        large: 'text-lg px-5 py-4 min-h-[100px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

const TextArea = ({
  // Required parameters with defaults
  placeholder = "Enter your question or message",
  text_font_size = "text-base",
  text_font_family = "Inter",
  text_font_weight = "font-medium",
  text_line_height = "leading-normal",
  text_text_align = "left",
  text_color = "text-text-muted",
  fill_background_color = "bg-secondary-background",
  border_border = "1px solid #dfdfdf",
  border_border_radius = "rounded-sm",
  effect_box_shadow = "0px 1px 2px #0000000c",
  
  // Optional parameters (no defaults)
  layout_width,
  padding,
  margin,
  position,
  
  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  value,
  onChange,
  onFocus,
  onBlur,
  rows = 4,
  ...props
}) => {
  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidMargin ? `m-[${margin}]` : '',
    hasValidPosition ? position : '',
  ]?.filter(Boolean)?.join(' ');

  // Build inline styles for required parameters
  const textAreaStyles = {
    fontSize: text_font_size === "text-base" ? "16px" : text_font_size,
    fontFamily: text_font_family || 'Inter',
    fontWeight: text_font_weight === "font-medium" ? "500" : text_font_weight,
    lineHeight: text_line_height === "leading-normal" ? "20px" : text_line_height,
    textAlign: text_text_align || 'left',
    color: text_color === "text-text-muted" ? "#828282" : text_color,
    backgroundColor: fill_background_color === "bg-secondary-background" ? "#ffffff" : fill_background_color,
    border: border_border || "1px solid #dfdfdf",
    borderRadius: border_border_radius === "rounded-sm" ? "8px" : border_border_radius,
    boxShadow: effect_box_shadow || "0px 1px 2px #0000000c",
  };

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      rows={rows}
      style={textAreaStyles}
      className={twMerge(
        textAreaClasses({ variant, size }),
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    />
  );
};

export default TextArea;
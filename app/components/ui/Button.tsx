"use client";

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps =
  | ({ variant?: ButtonVariant; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ variant?: ButtonVariant; href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>);

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", href, className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-[15px] sm:px-8 sm:py-3.5 sm:text-base font-semibold rounded-xl transition-colors text-center";

    const variants: Record<ButtonVariant, string> = {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-white text-dark border border-gray-300 hover:border-dark hover:bg-gray-50",
      outline: "bg-transparent text-dark border border-gray-300 hover:border-dark hover:bg-gray-50",
    };

    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
      return (
        <a ref={ref} href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref as unknown as Ref<HTMLButtonElement>} className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
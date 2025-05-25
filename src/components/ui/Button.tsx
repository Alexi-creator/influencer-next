import clsx from 'clsx';
import './Button.scss';
import { ButtonHTMLAttributes, ReactNode } from 'react';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export const Button = ({
  className = '',
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "btn",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

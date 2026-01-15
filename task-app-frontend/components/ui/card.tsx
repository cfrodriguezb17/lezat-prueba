import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card container component
 */
export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Card header section
 */
export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div
      className={clsx(
        "px-6 py-4 border-b border-zinc-100 dark:border-zinc-800",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Card body section
 */
export const CardBody = ({ children, className }: CardBodyProps) => {
  return <div className={clsx("px-6 py-4", className)}>{children}</div>;
};

/**
 * Card footer section
 */
export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div
      className={clsx(
        "px-6 py-4 border-t border-zinc-100 dark:border-zinc-800",
        className
      )}
    >
      {children}
    </div>
  );
};

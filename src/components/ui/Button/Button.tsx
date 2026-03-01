import styles from "./Button.module.css";

interface ButtonProps {
  children: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary";
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, type, className, color = "primary", onClick, disabled = false } = props;
  return (
    <button
      className={`${styles.button} ${styles[`button-${color}`]} ${className}`}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}{" "}
    </button>
  );
};

export default Button;

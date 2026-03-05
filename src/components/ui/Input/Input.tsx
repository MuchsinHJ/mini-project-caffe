import styles from "./Input.module.css";

interface InputProps {
  label?: string;
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    label,
    name,
    id,
    type = "text",
    placeholder,
    required = false,
    className,
    defaultValue,
    onChange,
  } = props;
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        type={type}
        id={id}
        className={`${styles.input} ${className}`}
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;

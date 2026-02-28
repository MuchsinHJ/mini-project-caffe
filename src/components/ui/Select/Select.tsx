import styles from "./Select.module.css";

interface IOptions {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  name: string;
  id: string;
  required?: boolean;
  className?: string;
  options?: IOptions[];
}

const Select = (props: SelectProps) => {
  const { label, name, id, required = false, className, options } = props;
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <select
        id={id}
        className={`${styles.select} ${className}`}
        name={name}
        required={required}
      >
        {options?.map((option: IOptions) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;

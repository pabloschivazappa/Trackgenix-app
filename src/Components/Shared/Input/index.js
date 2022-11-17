import Styles from './input.module.css';

const Input = ({ type = 'text', name, title, value, onChange, disabled = false }) => {
  return (
    <label className={Styles.label}>
      {title}
      <input type={type} name={name} value={value} onChange={onChange} disabled={disabled} />
    </label>
  );
};

export default Input;

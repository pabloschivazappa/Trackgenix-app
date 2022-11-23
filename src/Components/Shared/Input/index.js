import Styles from 'Components/Shared/Input/input.module.css';

const Input = ({ type = 'text', name, title, register, defaultValue, error }) => {
  return (
    <label className={Styles.label}>
      {title}
      <input type={type} {...register(name)} defaultValue={defaultValue} />
      {error && <p className={Styles.label}>{error}</p>}
    </label>
  );
};

export default Input;

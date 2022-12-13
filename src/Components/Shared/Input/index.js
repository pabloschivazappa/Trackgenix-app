import Styles from 'Components/Shared/Input/input.module.css';

const Input = ({ type = 'text', name, title, register, defaultValue, error, objectN = null }) => {
  const registerFn = objectN ? { ...register(name, objectN) } : { ...register(name) };

  return (
    <label className={Styles.label}>
      <input
        type={type}
        {...registerFn}
        defaultValue={defaultValue}
        className={error ? Styles.inputRed : ''}
      />
      {error && <p className={Styles.label}>{error}</p>}
      {title}
    </label>
  );
};

export default Input;

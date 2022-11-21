import Styles from 'Components/Shared/Input/input.module.css';

const Input = ({ type = 'text', name, title, register, defaultValue }) => {
  return (
    <label className={Styles.label}>
      {title}
      <input type={type} {...register(name)} defaultValue={defaultValue} />
    </label>
  );
};

export default Input;

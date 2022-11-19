import Styles from './input.module.css';

const Input = ({ type = 'text', name, title, register, defaultValue }) => {
  return (
    <label className={Styles.label}>
      {title}
      <input type={type} name={name} {...register(name)} defaultValue={defaultValue} />
    </label>
  );
};

export default Input;

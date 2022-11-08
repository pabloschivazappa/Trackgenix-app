import Styles from './input.module.css';

const Input = ({ type = 'text', name, title, value, onChange }) => {
  return (
    <label className={Styles.label}>
      {title}
      <input type={type} name={name} value={value} onChange={onChange} />
    </label>
  );
};

export default Input;

import Styles from './input.module.css';

const Input = ({ type = 'text', name, value = '', onChange = '' }) => {
  return (
    <label className={Styles.label}>
      {name}
      <input type={type} name={name} value={value} onChange={onChange} />
    </label>
  );
};

export default Input;

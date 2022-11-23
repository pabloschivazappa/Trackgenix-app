import styles from '../Select/select.module.css';

const Select = ({ list, name, kind, id = null, title, register, objectN = null }) => {
  const registerFn = objectN ? { ...register(name, objectN) } : { ...register(name) };

  return (
    <label className={styles.label}>
      {title}
      <select className={styles.select} {...registerFn}>
        {!id && <option hidden>- Select {title.toLowerCase()} -</option>}
        <option hidden>- Please select an existing {title.toLowerCase()} -</option>
        {list.map((item) => (
          <option value={item._id} key={item._id} className={styles.select}>
            {item[kind]}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;

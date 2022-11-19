import styles from '../Select/select.module.css';

const Select = ({ list, name, kind, id = null, title, register }) => {
  return (
    <label className={styles.label}>
      {title}
      <select name={name} className={styles.select} {...register(name)}>
        {!id && <option hidden>- Select {name} -</option>}
        <option hidden>- Please select an existing {name} -</option>
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

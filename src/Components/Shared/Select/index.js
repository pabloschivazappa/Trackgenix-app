import React from 'react';

const Select = ({ input, onChange, list, name, kind, id = null }) => {
  return (
    <select name={name} value={input} onChange={onChange}>
      {!id && <option hidden>- Select {name} -</option>}
      <option hidden>Please select an existing {name}</option>
      {list.map((item) => (
        <option value={item._id} key={item._id}>
          {item[kind]}
        </option>
      ))}
    </select>
  );
};

export default Select;

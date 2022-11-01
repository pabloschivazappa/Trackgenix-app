import React, { useState } from 'react';
import styles from './AddAdmins.module.css';

const AddAdmins = () => {
  const [adminInput, setAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    dni: '',
    phone: ''
  });

  const onChange = (e) => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminInput)
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        alert(data);
      } else {
        alert('Error');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Add New Admin</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={adminInput.name}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={adminInput.lastName}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className={styles.input}
            type="text"
            name="email"
            value={adminInput.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label>DNI</label>
          <input
            className={styles.input}
            type="text"
            name="dni"
            value={adminInput.dni}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            className={styles.input}
            type="text"
            name="phone"
            value={adminInput.phone}
            onChange={onChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
export default AddAdmins;

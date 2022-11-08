import React, { useEffect, useState } from 'react';
import styles from './FormAdmins.module.css';
import Modal from '../../Shared/Modal';
import Input from '../../Shared/Input';

const FormAdmins = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(id);

  const [adminInput, setAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: ''
  });

  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const editAndCreateMessage = (contentSubTitle, name, lastName, email, password, dni, phone) => {
    return ` ${contentSubTitle}:\n
  Name: ${name}
  Last Name: ${lastName}
  Email: ${email}
  Password: ${password}
  Dni: ${dni}
  Phone: ${phone}
  `;
  };

  useEffect(async () => {
    if (rowId) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
        const data = await response.json();
        setAdminInput({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password,
          dni: data.data.dni,
          phone: data.data.phone
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const createAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminInput)
      });
      const data = await response.json();
      setModalTitle('Create admin');
      if (data.error === true) {
        setChildren(data.message);
      } else {
        setChildren(() =>
          editAndCreateMessage(
            data.message,
            data.data.name,
            data.data.lastName,
            data.data.email,
            data.data.password,
            data.data.dni,
            data.data.phone
          )
        );
      }
    } catch (error) {
      setChildren(error);
    }
    setModalDisplay(true);
  };

  const editAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminInput)
      });
      const data = await response.json();
      setModalTitle('Edit super admin');
      if (!response.ok) {
        setChildren(data.message);
      } else {
        setChildren(() =>
          editAndCreateMessage(
            data.message,
            data.data.name,
            data.data.lastName,
            data.data.email,
            data.data.password,
            data.data.dni,
            data.data.phone
          )
        );
      }
      setModalDisplay(true);
    } catch (error) {
      setChildren(error);
    }
  };

  const onChange = (e) => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    rowId ? editAdmin() : createAdmin();
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.h2__form}>{rowId ? 'Edit' : 'Create'}</h2>
      </div>
      <form onSubmit={onSubmit} className={styles.form__admins}>
        <div>
          <Input type={'text'} name={'Name'} value={adminInput.name} onChange={onChange} />
        </div>
        <div>
          <label>Last Name</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={adminInput.lastName}
            onChange={onChange}
            required
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
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className={styles.input}
            type="text"
            name="password"
            value={adminInput.password}
            onChange={onChange}
            required
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
            required
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
            required
          />
        </div>
        <button className={`${styles.button__save} ${styles.form__button}`}>Cancel</button>
        <button type="submit" className={`${styles.button__save} ${styles.form__button}`}>
          {rowId ? 'Edit' : 'Create'}
        </button>
      </form>
      {modalDisplay ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </div>
  );
};
export default FormAdmins;

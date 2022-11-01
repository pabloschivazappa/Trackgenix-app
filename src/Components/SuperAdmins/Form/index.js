import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Modal from '../Modal';

function Form() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const product = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [dniValue, setDniValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
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

  if (idRegEx.test(product)) {
    useEffect(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${product}`);
        const data = await response.json();
        setNameValue(data.data.name);
        setLastNameValue(data.data.lastName);
        setEmailValue(data.data.email);
        setPasswordValue(data.data.password);
        setDniValue(data.data.dni);
        setPhoneValue(data.data.phone);
      } catch (error) {
        console.error(error);
      }
    }, []);
  }

  const editSuperAdmin = async (product) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${product}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
          dni: dniValue,
          phone: phoneValue
        })
      });
      const data = await response.json();
      console.log(data);
      setModalTitle('Edit super admin');
      if (data.error === true) {
        setContentMessage(data.message);
      } else {
        setContentMessage(() =>
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
      setContentMessage(error);
    }
  };

  const createSuperAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
          dni: dniValue,
          phone: phoneValue
        })
      });

      const data = await response.json();
      setModalTitle('Create super admin');
      if (data.error === true) {
        setContentMessage(data.message);
      } else {
        setContentMessage(() =>
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
      setContentMessage(error);
    }
    setModalDisplay(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const changeName = (e) => {
    setNameValue(e.target.value);
  };
  const changeLastName = (e) => {
    setLastNameValue(e.target.value);
  };
  const changeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const changePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const changePhone = (e) => {
    setPhoneValue(e.target.value);
  };
  const changeDni = (e) => {
    setDniValue(e.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.h2__form}>
          {idRegEx.test(product) ? 'Edit super admin' : 'Create super admin'}
        </h2>
        <form onSubmit={onSubmit} className={styles.form__super__admins}>
          <div>
            <label htmlFor="input-name">Name</label>
            <input id="input-name" name="name" required value={nameValue} onChange={changeName} />
          </div>
          <div>
            <label htmlFor="input-lastName">Last Name</label>
            <input
              id="input-lastName"
              name="lastName"
              required
              value={lastNameValue}
              onChange={changeLastName}
            />
          </div>
          <div>
            <label htmlFor="input-email">Email</label>
            <input
              id="input-email"
              name="email"
              required
              value={emailValue}
              onChange={changeEmail}
            />
          </div>
          <div>
            <label htmlFor="input-password">Password</label>
            <input
              id="input-password"
              type="password"
              name="password"
              required
              value={passwordValue}
              onChange={changePassword}
            />
          </div>
          <div>
            <label htmlFor="input-dni">DNI</label>
            <input id="input-dni" name="dni" required value={dniValue} onChange={changeDni} />
          </div>
          <div>
            <label htmlFor="input-phone">Phone</label>
            <input
              id="input-phone"
              name="phone"
              required
              value={phoneValue}
              onChange={changePhone}
            />
          </div>
          <div>
            <a href={'http://localhost:3000/super-admins'}>
              <button type="button" className={`${styles.button__cancel} ${styles.form__button}`}>
                Cancel
              </button>
            </a>
            <button
              type="submit"
              className={`${styles.button__save} ${styles.form__button}`}
              onClick={
                idRegEx.test(product) ? () => editSuperAdmin(product) : () => createSuperAdmin()
              }
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          contentMessage={contentMessage}
          setModalDisplay={setModalDisplay}
        />
      ) : null}
    </>
  );
}

export default Form;

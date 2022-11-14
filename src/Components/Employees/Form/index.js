import { useEffect, useState } from 'react';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';

function EmployeeForm() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  var product = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(product);

  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [dniValue, setDniValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${product}`);
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
    }
  }, []);

  const editEmployee = async (product) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${product}`, {
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
      setModalTitle('Edit employee');
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

  const createEmployee = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/`, {
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
      setModalTitle('Edit employee');
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

  const onSubmit = (event) => {
    event.preventDefault();
    rowId ? editEmployee(product) : createEmployee();
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
      <Form
        onSubmitFunction={onSubmit}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Employee' : 'Create Employee'}
      >
        <Input name="name" title="Name" value={nameValue} onChange={changeName} />
        <Input name="lastName" title="Last Name" value={lastNameValue} onChange={changeLastName} />
        <Input name="email" title="Email" value={emailValue} onChange={changeEmail} />
        <Input
          name="password"
          title="Password"
          value={passwordValue}
          onChange={changePassword}
          type="password"
        />
        <Input name="dni" title="DNI" value={dniValue} onChange={changeDni} />
        <Input name="phone" title="Phone" value={phoneValue} onChange={changePhone} />
      </Form>
      {modalDisplay ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
}

export default EmployeeForm;

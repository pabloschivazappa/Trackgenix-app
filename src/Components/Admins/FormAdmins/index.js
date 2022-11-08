import React, { useEffect, useState } from 'react';
import Form from '../../Shared/Form';
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
    } catch (error) {
      setChildren(error);
    }
    setModalDisplay(true);
  };

  const onChange = (e) => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    rowId ? editAdmin() : createAdmin();
  };

  return (
    <>
      <Form
        onSubmitFunction={onSubmit}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Admin' : 'Create Admin'}
      >
        <Input name="name" title="Name" value={adminInput.name} onChange={onChange} />
        <Input name="lastName" title="Last Name" value={adminInput.lastName} onChange={onChange} />
        <Input name="email" title="Email" value={adminInput.email} onChange={onChange} />
        <Input
          name="password"
          title="Password"
          value={adminInput.password}
          onChange={onChange}
          type="password"
        />
        <Input name="dni" title="DNI" value={adminInput.dni} onChange={onChange} />
        <Input name="phone" title="Phone" value={adminInput.phone} onChange={onChange} />
      </Form>

      {modalDisplay ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
};
export default FormAdmins;

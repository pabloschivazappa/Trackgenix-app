import React, { useEffect, useState } from 'react';
import Form from 'Components/Shared/Form';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Spinner from 'Components/Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { createAdmin, editAdmin } from 'redux/admins/thunks';
import { setFetching } from 'redux/admins/actions';

const FormAdmins = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  const [adminInput, setAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: ''
  });

  const [modalDisplay, setModalDisplay] = useState('');

  useEffect(async () => {
    if (rowId) {
      dispatch(setFetching(true));
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
      dispatch(setFetching(false));
    }
  }, []);

  const addAdmin = () => {
    dispatch(createAdmin(adminInput));
    setModalDisplay(true);
  };

  const putAdmin = () => {
    dispatch(editAdmin(id, adminInput));
    setModalDisplay(true);
  };

  const onChange = (e) => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    rowId ? putAdmin() : addAdmin();
  };

  return (
    <>
      <Form
        onSubmitFunction={onSubmit}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Admin' : 'Create Admin'}
      >
        {!fetching ? (
          <>
            <Input name="name" title="Name" value={adminInput.name} onChange={onChange} />
            <Input
              name="lastName"
              title="Last Name"
              value={adminInput.lastName}
              onChange={onChange}
            />
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
          </>
        ) : (
          <Spinner />
        )}
      </Form>
      {modalDisplay && !fetching ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
};
export default FormAdmins;

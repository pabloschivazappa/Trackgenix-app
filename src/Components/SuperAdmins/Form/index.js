import React, { useEffect, useState } from 'react';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { createSuperAdmin, editSuperAdmin } from '../../../redux/superAdmins/thunks';
import { setFetching } from '../../../redux/superAdmins/actions';

const SuperAdminsForm = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();

  const [superAdminInput, setSuperAdminInput] = useState({
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`);
        const data = await response.json();
        setSuperAdminInput({
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

  const addSuperAdmin = () => {
    dispatch(createSuperAdmin(superAdminInput));
    setModalDisplay(true);
  };

  const putSuperAdmin = () => {
    dispatch(editSuperAdmin(id, superAdminInput));
    setModalDisplay(true);
  };

  const onChange = (e) => {
    setSuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    rowId ? putSuperAdmin() : addSuperAdmin();
  };

  return (
    <>
      <Form
        onSubmitFunction={onSubmit}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Super Admin' : 'Create Super Admin'}
      >
        {!fetching ? (
          <>
            <Input name="name" title="Name" value={superAdminInput.name} onChange={onChange} />
            <Input
              name="lastName"
              title="Last Name"
              value={superAdminInput.lastName}
              onChange={onChange}
            />
            <Input name="email" title="Email" value={superAdminInput.email} onChange={onChange} />
            <Input
              name="password"
              title="Password"
              value={superAdminInput.password}
              onChange={onChange}
              type="password"
            />
            <Input name="dni" title="DNI" value={superAdminInput.dni} onChange={onChange} />
            <Input name="phone" title="Phone" value={superAdminInput.phone} onChange={onChange} />
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

export default SuperAdminsForm;

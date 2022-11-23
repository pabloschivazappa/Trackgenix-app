import React, { useEffect, useState } from 'react';
import Form from 'Components/Shared/Form';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Spinner from 'Components/Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { createSuperAdmin, editSuperAdmin } from 'redux/superAdmins/thunks';
import { setFetching } from 'redux/superAdmins/actions';
import { useForm } from 'react-hook-form';

const SuperAdminsForm = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: ''
  });

  const [superAdmins, setSuperAdmins] = useState('');

  const { register, handleSubmit, setValue, reset } = useForm({
    mode: 'onChange'
  });

  useEffect(async () => {
    if (rowId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`);
        const data = await response.json();
        setSuperAdmins(data.data);
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  useEffect(() => {
    if (superAdmins && rowId) {
      setValue('name', superAdmins.name);
      setValue('lastName', superAdmins.lastName);
      setValue('email', superAdmins.email);
      setValue('password', superAdmins.password);
      setValue('dni', superAdmins.dni);
      setValue('phone', superAdmins.phone);

      setValues({
        name: superAdmins.name,
        lastName: superAdmins.lastName,
        email: superAdmins.email,
        password: superAdmins.password,
        dni: superAdmins.dni,
        phone: superAdmins.phone
      });
    }
  }, [superAdmins]);

  const addSuperAdmin = (data) => {
    dispatch(createSuperAdmin(data));
    setModalDisplay(true);
  };

  const putSuperAdmin = (data) => {
    dispatch(editSuperAdmin(id, data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    setValues({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      dni: data.dni,
      phone: data.phone
    });
    rowId ? putSuperAdmin(data) : addSuperAdmin(data);
  };

  const resetForm = () => {
    reset(values);
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        resetFunction={resetForm}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Super Admin' : 'Create Super Admin'}
      >
        {!fetching ? (
          <>
            <Input register={register} name="name" title="Name" />
            <Input register={register} name="lastName" title="Last Name" />
            <Input register={register} name="email" title="Email" />
            <Input register={register} name="password" title="Password" type="password" />
            <Input register={register} name="dni" title="DNI" />
            <Input register={register} name="phone" title="Phone" />
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

import React, { useEffect, useState } from 'react';
import Form from 'Components/Shared/Form';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Spinner from 'Components/Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { createAdmin, editAdmin } from 'redux/admins/thunks';
import { setFetching } from 'redux/admins/actions';
import { useForm } from 'react-hook-form';

const FormAdmins = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.admins);
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

  const [admin, setAdmin] = useState('');

  const { register, handleSubmit, setValue, reset } = useForm({
    mode: 'onChange'
  });

  useEffect(async () => {
    if (rowId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
        const data = await response.json();
        setAdmin(data.data);
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  useEffect(() => {
    if (admin && rowId) {
      setValue('name', admin.name);
      setValue('lastName', admin.lastName);
      setValue('email', admin.email);
      setValue('password', admin.password);
      setValue('dni', admin.dni);
      setValue('phone', admin.phone);

      setValues({
        name: admin.name,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password,
        dni: admin.dni,
        phone: admin.phone
      });
    }
  }, [admin]);

  const addAdmin = (data) => {
    dispatch(createAdmin(data));
    setModalDisplay(true);
  };

  const putAdmin = (data) => {
    dispatch(editAdmin(id, data));
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
    rowId ? putAdmin(data) : addAdmin(data);
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
        formTitle={rowId ? 'Edit Admin' : 'Create Admin'}
      >
        {!fetching ? (
          <>
            <Input register={register} name="lastName" title="Last Name" />
            <Input register={register} name="name" title="Name" />
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
export default FormAdmins;

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

  const [values, setValues] = useState({
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
        setValues({
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

  useEffect(() => {
    reset(values);
  }, [values]);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: values
  });

  const addSuperAdmin = (data) => {
    dispatch(createSuperAdmin(data));
    setModalDisplay(true);
  };

  const putSuperAdmin = (data) => {
    dispatch(editSuperAdmin(id, data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    if (rowId) {
      putSuperAdmin(data);
      setValues(data);
    } else {
      addSuperAdmin(data);
    }
  };

  const resetForm = () => {
    reset(values);
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Super Admin' : 'Create Super Admin'}
        resetFunction={() => resetForm()}
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

import React, { useEffect, useState } from 'react';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { createSuperAdmin, editSuperAdmin } from '../../../redux/superAdmins/thunks';
import { setFetching } from '../../../redux/superAdmins/actions';
import { useForm } from 'react-hook-form';
import { schema } from 'Components/SuperAdmins/Form/validations';
import { joiResolver } from '@hookform/resolvers/joi';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: values
  });

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

  const addSuperAdmin = (data) => {
    dispatch(createSuperAdmin(data));
    setModalDisplay(true);
  };

  const putSuperAdmin = (data) => {
    dispatch(editSuperAdmin(id, data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    rowId ? putSuperAdmin(data) : addSuperAdmin(data);
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Super Admin' : 'Create Super Admin'}
      >
        {!fetching ? (
          <>
            <Input
              register={register}
              name="lastName"
              title="Last Name"
              error={errors.lastName?.message}
            />
            <Input register={register} name="name" title="Name" error={errors.name?.message} />
            <Input register={register} name="email" title="Email" error={errors.email?.message} />
            <Input
              register={register}
              name="password"
              title="Password"
              type="password"
              error={errors.password?.message}
            />
            <Input register={register} name="dni" title="DNI" error={errors.dni?.message} />
            <Input register={register} name="phone" title="Phone" error={errors.phone?.message} />
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

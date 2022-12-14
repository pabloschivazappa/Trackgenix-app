import { useState } from 'react';
import { Modal, Form, Input, Spinner, RedirectButton } from 'Components/Shared';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { schema } from 'Components/Auth/SignUp/validation';
import { joiResolver } from '@hookform/resolvers/joi';

function SignUp() {
  const dispatch = useDispatch();
  const { children, modalTitle, fetching } = useSelector((state) => state.employees);
  const [modalDisplay, setModalDisplay] = useState('');
  const values = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: ''
  };

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

  const postEmployee = (data) => {
    dispatch(createEmployee(data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    postEmployee(data);
  };

  const resetForm = () => {
    reset(values);
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage="Sign up"
        formTitle="Sign up"
        resetFunction={() => resetForm()}
      >
        {!fetching ? (
          <>
            <Input register={register} name="name" title="Name" error={errors.name?.message} />
            <Input
              register={register}
              name="lastName"
              title="Last Name"
              error={errors.lastName?.message}
            />
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

            <span>
              {`You already have a user? Please `}
              <RedirectButton title="Login" path="login" />
            </span>
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
}

export default SignUp;

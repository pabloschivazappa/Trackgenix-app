import { Form, Input, RedirectButton } from 'Components/Shared';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from 'redux/auth/thunks';
import { setErrorValue } from 'redux/auth/actions';
import { schemaLogin } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';
import Modal from 'Components/Shared/Modal';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schemaLogin)
  });
  const { error } = useSelector((state) => state.auth);
  const onSubmit = async (inputData) => {
    const role = await dispatch(login(inputData));
    if (role) {
      switch (role) {
        case 'EMPLOYEE':
          history.push('/employees');
      }
      switch (role) {
        case 'SUPER_ADMIN':
          history.push('/super-admins');
      }
      switch (role) {
        case 'ADMIN':
          history.push('/admins');
      }
    }
  };

  return (
    <>
      <Form onSubmitFunction={handleSubmit(onSubmit)} buttonMessage="Login" formTitle="Login">
        <Input title="Email" name="email" register={register} error={errors.email?.message} />
        <Input
          type="password"
          title="Password"
          name="password"
          register={register}
          error={errors.password?.message}
        />
        <span>
          {`You don't have a user? Please `}
          <RedirectButton title="Sign up" path="sign-up" />
        </span>
      </Form>
      {error && (
        <Modal title="Login error" setModalDisplay={() => dispatch(setErrorValue(false))}>
          {'Invalid Email or Password'}
        </Modal>
      )}
    </>
  );
};

export default Login;

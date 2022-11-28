import { Form, Input, RedirectButton } from 'Components/Shared';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/thunks';

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    const role = dispatch(login(data));
    console.log(role);
  };
  return (
    <Form onSubmitFunction={handleSubmit(onSubmit)} buttonMessage="Login" formTitle="Sign in">
      <Input title="Email" name="email" register={register}></Input>
      <Input type="password" title="Password" name="password" register={register}></Input>
      <span>
        {`You don't have a user? Please `}
        <RedirectButton title="sign up" path="sign-up" />
      </span>
    </Form>
  );
};

export default Login;

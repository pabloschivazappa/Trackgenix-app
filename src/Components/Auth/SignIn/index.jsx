import { Form, Input, RedirectButton } from 'Components/Shared';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Form onSubmitFunction={handleSubmit(onSubmit)} buttonMessage="Log in" formTitle="Sign-in">
      <Input title="Email" name="email" register={register}></Input>
      <Input type="password" title="Password" name="password" register={register}></Input>
      <span>
        {`You don't have a user? Please `}
        <RedirectButton title="sign up" path="sign-up" />
      </span>
    </Form>
  );
};

export default SignIn;

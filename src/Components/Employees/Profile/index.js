import { useEffect, useState } from 'react';
import styles from './profile.module.css';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee } from '../../../redux/employees/thunks';
import { setFetching } from '../../../redux/employees/actions';
import { useForm } from 'react-hook-form';
import { schema } from 'Components/Employees/Profile/validations';
import { joiResolver } from '@hookform/resolvers/joi';

function EmployeesProfile() {
  const dispatch = useDispatch();
  const { children, modalTitle, fetching } = useSelector((state) => state.employees);
  const product = '637556a4d6689c383fac4a66';
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(product);

  const [modalDisplay, setModalDisplay] = useState('');

  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: ''
  });

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${product}`);
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

  const putEmployee = (data) => {
    dispatch(editEmployee(product, data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    putEmployee(data);
  };

  return (
    <>
      <Form
        profileFormWidth="form__width__max"
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage={'Edit'}
        formTitle={'My Profile'}
      >
        {!fetching ? (
          <>
            <img
              className={styles.profilePicture}
              src="https://avatars.githubusercontent.com/u/53354878?v=4"
              alt="Profile Picture"
            />
            <div className={styles.formInputs}>
              <div className={styles.formColumn}>
                <Input name="name" title="Name" register={register} error={errors.name?.message} />
                <Input
                  name="lastName"
                  title="Last Name"
                  register={register}
                  error={errors.lastName?.message}
                />
                <Input
                  name="email"
                  title="Email"
                  register={register}
                  error={errors.email?.message}
                />
              </div>
              <div className={styles.formColumn}>
                <Input
                  name="password"
                  title="Password"
                  type="password"
                  register={register}
                  error={errors.password?.message}
                />
                <Input name="dni" title="DNI" register={register} error={errors.dni?.message} />
                <Input
                  name="phone"
                  title="Phone"
                  register={register}
                  error={errors.phone?.message}
                />
              </div>
            </div>
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

export default EmployeesProfile;

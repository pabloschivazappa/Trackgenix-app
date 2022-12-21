import { useEffect, useState } from 'react';
import styles from './profile.module.css';
import Modal from '../Shared/Modal';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee } from '../../redux/employees/thunks';
import { editAdmin } from 'redux/admins/thunks';
import { editSuperAdmin } from 'redux/superAdmins/thunks';
import { setFetching } from '../../redux/employees/actions';
import { useForm } from 'react-hook-form';
import { schema } from 'Components/Profile/validations';
import { joiResolver } from '@hookform/resolvers/joi';

function EmployeesProfile() {
  const { id: product, data: role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { children, modalTitle, fetching } = useSelector((state) => state.employees);
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(product);
  const token = sessionStorage.getItem('token');

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

  const param = (data) => {
    if (data == 'SUPER_ADMIN') {
      return 'super-admins';
    }
    if (data == 'EMPLOYEE') {
      return 'employees';
    }
    if (data == 'ADMIN') {
      return 'admins';
    }
  };

  useEffect(async () => {
    if (rowId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${param(role)}/${product}`, {
          headers: { token }
        });
        const data = await response.json();
        setValues({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          dni: data.data.dni,
          phone: data.data.phone
        });
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, [product]);

  useEffect(() => {
    reset(values);
  }, [values]);

  const putEmployee = (data, role) => {
    switch (role) {
      case 'EMPLOYEE':
        dispatch(editEmployee(product, data, true));
        break;
      case 'ADMIN':
        dispatch(editAdmin(product, { ...data, active: true }, true));
        break;
      case 'SUPER_ADMIN':
        dispatch(editSuperAdmin(product, data));
        break;
    }

    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    putEmployee(data, role);
    setValues(data);
  };

  const resetForm = () => {
    reset(values);
  };

  return (
    <>
      <Form
        profileFormWidth="form__width__max"
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage={'Edit'}
        formTitle={'My Profile'}
        resetFunction={() => resetForm()}
      >
        <>
          <div className={styles.profilePicture__container}>
            <img
              className={styles.profilePicture}
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt="Profile Picture"
            />
          </div>
          <div className={styles.formInputs}>
            <div className={styles.formColumn}>
              <Input name="name" title="Name" register={register} error={errors.name?.message} />
              <Input
                name="lastName"
                title="Last Name"
                register={register}
                error={errors.lastName?.message}
              />
              <Input name="email" title="Email" register={register} error={errors.email?.message} />
            </div>
            <div className={styles.formColumn}>
              <Input name="dni" title="DNI" register={register} error={errors.dni?.message} />
              <Input name="phone" title="Phone" register={register} error={errors.phone?.message} />
            </div>
          </div>
        </>
      </Form>
      {modalDisplay && !fetching ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {role === 'ADMIN'
            ? 'Admin edited successfully'
            : role === 'SUPER_ADMIN'
            ? 'Super admin edited successfully'
            : children}
        </Modal>
      ) : null}
    </>
  );
}

export default EmployeesProfile;

import { useEffect, useState } from 'react';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, editEmployee } from '../../../redux/employees/thunks';
import { setFetching } from '../../../redux/employees/actions';
import { useForm } from 'react-hook-form';

function EmployeeForm() {
  const dispatch = useDispatch();
  const { children, modalTitle, fetching } = useSelector((state) => state.employees);
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(id);
  const [modalDisplay, setModalDisplay] = useState('');
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: ''
  });

  const [employee, setEmployee] = useState('');

  const { register, handleSubmit, setValue, reset } = useForm({
    mode: 'onChange'
  });

  useEffect(async () => {
    if (rowId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`);
        const data = await response.json();
        setEmployee(data.data);
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  useEffect(() => {
    if (employee && rowId) {
      setValue('name', employee.name);
      setValue('lastName', employee.lastName);
      setValue('email', employee.email);
      setValue('password', employee.password);
      setValue('dni', employee.dni);
      setValue('phone', employee.phone);

      setValues({
        name: employee.name,
        lastName: employee.lastName,
        email: employee.email,
        password: employee.password,
        dni: employee.dni,
        phone: employee.phone
      });
    }
  }, [employee]);

  const postEmployee = (data) => {
    dispatch(createEmployee(data));
    setModalDisplay(true);
  };

  const putEmployee = (data) => {
    dispatch(editEmployee(id, data));
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
    rowId ? putEmployee(data) : postEmployee(data);
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
        formTitle={rowId ? 'Edit Employee' : 'Create Employee'}
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
}

export default EmployeeForm;

import { useEffect, useState } from 'react';
import styles from './profile.module.css';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee } from '../../../redux/employees/thunks';
import { setFetching } from '../../../redux/employees/actions';

function EmployeesProfile() {
  const dispatch = useDispatch();
  const { children, modalTitle, fetching } = useSelector((state) => state.employees);
  const product = '637556a4d6689c383fac4a66';
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(product);

  const [modalDisplay, setModalDisplay] = useState('');

  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    dni: '',
    phone: ''
  });

  useEffect(async () => {
    if (rowId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${product}`);
        const data = await response.json();
        setEmployeeInput({
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

  const putEmployee = () => {
    dispatch(editEmployee(product, employeeInput));
    setModalDisplay(true);
  };

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    putEmployee();
  };

  return (
    <>
      <Form
        profileFormWidth="form__width__max"
        onSubmitFunction={onSubmit}
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
                <Input name="name" title="Name" value={employeeInput.name} onChange={onChange} />
                <Input
                  name="lastName"
                  title="Last Name"
                  value={employeeInput.lastName}
                  onChange={onChange}
                />
                <Input name="email" title="Email" value={employeeInput.email} onChange={onChange} />
              </div>
              <div className={styles.formColumn}>
                <Input
                  name="password"
                  title="Password"
                  value={employeeInput.password}
                  onChange={onChange}
                  type="password"
                />
                <Input name="dni" title="DNI" value={employeeInput.dni} onChange={onChange} />
                <Input name="phone" title="Phone" value={employeeInput.phone} onChange={onChange} />
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

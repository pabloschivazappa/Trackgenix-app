import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import formStyles from './form.module.css';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
import FunctionalButton from '../../Shared/Buttons/FunctionalButton';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, editProject } from '../../../redux/projects/thunks';
import { setFetching } from '../../../redux/projects/actions';

const ProjectForm = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const isValidId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    description: '',
    clientName: '',
    startDate: '',
    endDate: '',
    active: true
  });
  const [employees, setEmployees] = useState([]);
  const [modalDisplay, setModalDisplay] = useState('');

  useEffect(async () => {
    if (isValidId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        console.log('project data', data);
        setValues({
          name: data.data.name,
          clientName: data.data.clientName,
          description: data.data.description,
          startDate: data.data.startDate.substr(0, 10),
          endDate: data.data.endDate.substr(0, 10),
          active: true
        });
        setEmployees(data.data.employees.filter((item) => item.employee !== null));
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  const addProject = (body) => {
    dispatch(createProject(body));
    setModalDisplay(true);
  };

  const changeProject = (body) => {
    dispatch(editProject(id, body));
    setModalDisplay(true);
  };

  const onSubmit = () => {
    const unpopulatedEmployees = employees.map((emp) => {
      return { role: emp.role, rate: emp.rate, employee: emp.employee._id };
    });

    const body = { ...values, employees: unpopulatedEmployees };
    !isValidId ? addProject(body) : changeProject(body);
  };

  // const onChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const onChangeEmployee = (event, employee) => {
    setEmployees((employees) => {
      return employees.map((emp) => {
        if (emp.employee._id === employee.employee._id) {
          return {
            employee: {
              ...employee.employee,
              _id: event.target.name === 'id' ? event.target.value : employee.employee._id
            },
            role: event.target.name === 'role' ? event.target.value : employee.role,
            rate: event.target.name === 'rate' ? event.target.value : employee.rate
          };
        }
        return emp;
      });
    });
  };

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: values
  });

  useEffect(() => {
    reset(values);
  }, [values]);

  useEffect(() => {
    console.log('project state', values);
  }, [values]);

  useEffect(() => {
    console.log('employees state', employees);
  }, [employees]);

  const deleteEmployee = (employee) => {
    setEmployees((employees) => {
      return employees.filter((emp) => emp.employee._id !== employee.employee._id);
    });
  };

  const addEmployee = () => {
    setEmployees(() => {
      return [...employees, { employee: {}, rate: 0, role: '' }];
    });
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage={isValidId ? 'Edit' : 'Create'}
        formTitle={isValidId ? 'Edit Project' : 'Create Project'}
      >
        {!fetching ? (
          <>
            <Input register={register} title="Project Name" name="name" />
            <Input register={register} title="Description" name="description" />
            <Input register={register} title="Client Name" name="clientName" />
            <Input register={register} title="Start Date" type="date" name="startDate" />
            <Input register={register} title="End Date" type="date" name="endDate" />
            <div className={formStyles.form__container}>
              <label className={formStyles.form__label}> Add Employees (optional)</label>
              {employees.map((item, index) => (
                <div key={index} className={formStyles.employee__form}>
                  <Input
                    title="Employee"
                    name="id"
                    value={item.employee._id}
                    onChange={(e) => onChangeEmployee(e, item)}
                  />
                  <Input
                    title="Rate"
                    name="rate"
                    value={item.rate}
                    onChange={(e) => onChangeEmployee(e, item)}
                  />
                  <Input
                    title="Role"
                    name="role"
                    value={item.role}
                    onChange={(e) => onChangeEmployee(e, item)}
                  />
                  <FunctionalButton
                    title="Delete"
                    action={() => deleteEmployee(item)}
                    buttonType="form__button__add__employee"
                    buttonColor="red"
                  />
                </div>
              ))}
              <FunctionalButton
                title="Add"
                action={addEmployee}
                buttonType="form__button__add__employee"
                buttonColor="green"
              />
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </Form>
      {modalDisplay ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
};

export default ProjectForm;

import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
  /* const [employees, setEmployees] = useState([]); */
  const [modalDisplay, setModalDisplay] = useState('');
  const { register, handleSubmit, reset, control } = useForm({
    mode: 'onChange',
    defaultValues: values
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees' // unique name for your Field Array
  });

  useEffect(async () => {
    if (isValidId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        setValues({
          name: data.data.name,
          clientName: data.data.clientName,
          description: data.data.description,
          startDate: data.data.startDate.substr(0, 10),
          endDate: data.data.endDate.substr(0, 10),
          active: true
        });
        /* setValues(data.data.employees.filter((item) => item.employee !== null)); */
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  const addProject = (data) => {
    dispatch(createProject(data));
    setModalDisplay(true);
  };

  const changeProject = (data) => {
    dispatch(editProject(id, data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    /* const unpopulatedEmployees = employees.map((emp) => {
      return { role: emp.role, rate: emp.rate, employee: emp.employee._id };
    }); */

    /* const body = { ...data }; */
    console.log(data);
    !isValidId ? addProject(data) : changeProject(data);
  };

  // const onChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  /* const onChangeEmployee = (event, employee) => {
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
  }; */

  useEffect(() => {
    reset(values);
  }, [values]);

  /*   useEffect(() => {
    console.log('project state', values);
  }, [values]);

  useEffect(() => {
    console.log('employees state', employees);
  }, [employees]); */

  /* const deleteEmployee = (employee) => {
    console.log(employee);
    setEmployees((employees) => {
      return employees.filter((emp) => emp.employee._id !== employee.employee._id);
    });
  }; */

  /* const addEmployee = () => {
    setEmployees(() => {
      return [...employees, { employee: {}, rate: 0, role: '' }];
    });
  }; */

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
              {fields.map((item, index) => (
                <div key={index} className={formStyles.employee__form}>
                  {/* <Input title="Employee" name="id" />
                  <Input title="Rate" name="rate" />
                  <Input title="Role" name="role" /> */}
                  <input title="Employee" {...register(`employees[${index}].employee`)}></input>
                  <label>
                    Rate
                    <input {...register(`employees[${index}].rate`)}></input>
                  </label>
                  <input title="Role" {...register(`employees[${index}].role`)}></input>
                  <FunctionalButton
                    title="Delete"
                    action={() => remove(index)}
                    buttonType="form__button__add__employee"
                    buttonColor="red"
                  />
                </div>
              ))}
              <FunctionalButton
                title="Add"
                action={append}
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

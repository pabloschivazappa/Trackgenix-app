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
import { Select } from 'Components/Shared';
import { getEmployees } from 'redux/employees/thunks';

const ProjectForm = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const isValidId = idRegEx.test(id);
  const dispatch = useDispatch();
  const { children, modalTitle, fetching } = useSelector((state) => state.projects);
  const { list: employeesList } = useSelector((state) => state.employees);
  const roles = ['QA', 'DEV', 'TL'];
  const [modalDisplay, setModalDisplay] = useState('');
  const [values, setValues] = useState({
    name: '',
    description: '',
    clientName: '',
    startDate: '',
    endDate: '',
    employees: [
      {
        role: '- Select role -',
        employee: '- Select employee -',
        rate: ''
      }
    ],
    active: true
  });
  const [project, setProject] = useState('');

  const { register, handleSubmit, setValue, reset, control } = useForm({
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  });

  useEffect(async () => {
    dispatch(getEmployees());
    if (isValidId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        setProject(data.data);
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  useEffect(() => {
    if (project && isValidId) {
      setValue('name', project.name);
      setValue('clientName', project.clientName);
      setValue('description', project.description);
      setValue('startDate', project.startDate.substr(0, 10));
      setValue('endDate', project.endDate.substr(0, 10));
      setValue(
        'employees',
        project.employees.map((employee) => {
          return {
            rate: employee.rate,
            role: employee.role,
            employee: employee.employee?._id
          };
        })
      );
      setValue('active', project.active);

      setValues({
        name: project.name,
        clientName: project.clientName,
        description: project.description,
        startDate: project.startDate.substr(0, 10),
        endDate: project.endDate.substr(0, 10),
        employees: project.employees.map((employee) => {
          return {
            rate: employee.rate,
            role: employee.role,
            employee: employee.employee?._id
          };
        }),
        active: project.active
      });
    }
  }, [project]);

  const addProject = (data) => {
    dispatch(createProject(data));
  };

  const changeProject = (data) => {
    dispatch(editProject(id, data));
  };

  const onSubmit = async (data) => {
    setValues({
      name: data.name,
      clientName: data.clientName,
      description: data.description,
      startDate: data.startDate.substr(0, 10),
      endDate: data.endDate.substr(0, 10),
      employees: data.employees.map((employee) => {
        return {
          rate: employee.rate,
          role: employee.role,
          employee: employee.employee?._id
        };
      }),
      active: data.active
    });
    !isValidId ? addProject(data) : changeProject(data);
    setModalDisplay(true);
  };

  const resetForm = () => {
    reset(values);
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        resetFunction={resetForm}
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
              {fields.map((field, index) => (
                <div key={field.id} className={formStyles.employee__form}>
                  <Select
                    register={register}
                    list={employeesList}
                    name={`employees[${index}].employee`}
                    kind="name"
                    id={id}
                    title="Employee"
                  />
                  <Input register={register} title="Rate" name={`employees[${index}].rate`} />
                  <label className={formStyles.label}>
                    Role
                    <select className={formStyles.select} {...register(`employees[${index}].role`)}>
                      <option hidden>- Select a role -</option>
                      {roles.map((role, index) => (
                        <option key={index}>{role}</option>
                      ))}
                    </select>
                  </label>
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
                action={() => append()}
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

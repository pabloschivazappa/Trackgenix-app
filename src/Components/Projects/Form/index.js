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
import { schema } from 'Components/Projects/Form/validations';
import { joiResolver } from '@hookform/resolvers/joi';

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
        role: '',
        employee: '',
        rate: ''
      }
    ],
    active: true
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: values
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
        setValues({
          name: data.data.name,
          clientName: data.data.clientName,
          description: data.data.description,
          startDate: data.data.startDate.substr(0, 10),
          endDate: data.data.endDate.substr(0, 10),
          employees: data.data?.employees.map((employee) => {
            return {
              rate: employee.rate,
              role: employee.role,
              employee: employee.employee?._id
            };
          }),
          active: true
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

  const addProject = (data) => {
    dispatch(createProject(data));
  };

  const changeProject = (data) => {
    dispatch(editProject(id, data));
  };

  const onSubmit = async (data) => {
    !isValidId ? addProject(data) : changeProject(data);
    setModalDisplay(true);
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
            <Input
              register={register}
              title="Project Name"
              name="name"
              error={errors.name?.message}
            />
            <Input
              register={register}
              title="Description"
              name="description"
              error={errors.description?.message}
            />
            <Input
              register={register}
              title="Client Name"
              name="clientName"
              error={errors.clientName?.message}
            />
            <Input
              register={register}
              title="Start Date"
              type="date"
              name="startDate"
              error={errors.startDate?.message}
            />
            <Input
              register={register}
              title="End Date"
              type="date"
              name="endDate"
              error={errors.endDate?.message}
            />
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

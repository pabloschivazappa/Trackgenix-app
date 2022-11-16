import { useState, useEffect } from 'react';
import formStyles from './form.module.css';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
// import Select from '../../Shared/Select';
import FunctionalButton from '../../Shared/Buttons/FunctionalButton';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, editProject } from '../../../redux/projects/thunks';
import { setFetching } from '../../../redux/projects/actions';
import { getEmployees } from '../../../redux/employees/thunks';

const ProjectForm = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const isValidId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.projects);
  // const { list: employeesList } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({
    id: '',
    role: '',
    rate: ''
  });
  const [projectBody, setProjectBody] = useState({
    name: '',
    description: '',
    clientName: '',
    startDate: '',
    endDate: '',
    employees: [],
    active: true
  });
  const [modalDisplay, setModalDisplay] = useState('');
  // const roles = ['DEV', 'TL', 'QA', 'PM'];

  useEffect(async () => {
    dispatch(getEmployees());
    if (isValidId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        setProjectBody({
          name: data.data.name,
          clientName: data.data.clientName,
          description: data.data.description,
          startDate: data.data.startDate.substr(0, 10),
          endDate: data.data.endDate.substr(0, 10),
          employees: data.data?.employees.filter((employee) => employee.employee !== null),
          active: true
        });
        console.log(data.data);
        // setEmployee(data.data.employees.filter((employee) => employee.employee !== null));
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  const addProject = () => {
    dispatch(createProject(projectBody));
    setModalDisplay(true);
  };

  const changeProject = () => {
    dispatch(editProject(id, projectBody));
    setModalDisplay(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    !isValidId ? addProject(projectBody) : changeProject(projectBody);
  };

  const onChange = (e) => {
    setProjectBody({ ...projectBody, [e.target.name]: e.target.value });
  };

  const onChangeEmployee = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Form
        onSubmitFunction={onSubmit}
        buttonMessage={isValidId ? 'Edit' : 'Create'}
        formTitle={isValidId ? 'Edit Project' : 'Create Project'}
      >
        {!fetching ? (
          <>
            <Input title="Project Name" name="name" value={projectBody.name} onChange={onChange} />
            <Input
              title="Description"
              name="description"
              value={projectBody.description}
              onChange={onChange}
            />
            <Input
              title="Client Name"
              name="clientName"
              value={projectBody.clientName}
              onChange={onChange}
            />
            <Input
              title="Start Date"
              type="date"
              name="startDate"
              value={projectBody.startDate}
              onChange={onChange}
            />
            <Input
              title="End Date"
              type="date"
              name="endDate"
              value={projectBody.endDate}
              onChange={onChange}
            />
            <div className={formStyles.form__container}>
              <label className={formStyles.form__label}> Add Employees (optional)</label>
              {projectBody.employees.map((item, index) => (
                <div key={index} className={formStyles.employee__form}>
                  <Input
                    title="Employee"
                    name="id"
                    value={item.employee._id}
                    onChange={onChangeEmployee}
                  />
                  <Input title="Rate" name="rate" value={item.rate} onChange={onChangeEmployee} />
                  <Input title="Role" name="role" value={item.role} onChange={onChangeEmployee} />
                  <FunctionalButton
                    title="Delete"
                    action={(e) => {
                      e.target.closest('div').remove();
                    }}
                    buttonType="form__button__add__employee"
                    buttonColor="red"
                  />
                </div>
              ))}
              <FunctionalButton
                title="Add"
                action={() =>
                  setEmployee([
                    ...employee,
                    {
                      employee: '',
                      rate: 0,
                      role: ''
                    }
                  ])
                }
                buttonType="form__button__add__employee"
                buttonColor="grayish-navy"
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

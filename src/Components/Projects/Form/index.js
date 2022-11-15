import { useState, useEffect } from 'react';
import formStyles from './form.module.css';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
import FunctionalButton from '../../Shared/Buttons/FunctionalButton';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, editProject } from '../../../redux/projects/thunks';
import { setFetching } from '../../../redux/projects/actions';

const AddItem = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const initialValue = {
    name: '',
    description: '',
    clientName: '',
    startDate: '',
    endDate: '',
    employees: '',
    active: true
  };
  const [project, setProject] = useState(initialValue);
  const [employees, setEmployees] = useState([]);
  const [modalDisplay, setModalDisplay] = useState('');
  // const [children, setChildren] = useState('');
  // const [modalTitle, setModalTitle] = useState('');

  // const editAndCreateMessage = (
  //   contentSubTitle,
  //   name,
  //   description,
  //   clientName,
  //   startDate,
  //   endDate,
  //   employees,
  //   active
  // ) => {
  //   return ` ${contentSubTitle}:\n
  // Name: ${name}
  // Description: ${description}
  // Client Name: ${clientName}
  // Start Date: ${startDate}
  // End Date: ${endDate}
  // Employees: ${employees}
  // Active: ${active}
  // `;
  // };

  useEffect(async () => {
    if (rowId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        setProject({
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

  const addProject = () => {
    dispatch(createProject(project));
    setModalDisplay(true);
  };

  const putProject = () => {
    dispatch(editProject(rowId, project));
    setModalDisplay(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    !rowId ? addProject(project) : putProject(project);
  };

  return (
    <>
      <Form
        onSubmitFunction={onSubmit}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Project' : 'Create Project'}
      >
        {!fetching ? (
          <>
            <Input
              title="Project Name"
              name="name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
            <Input
              title="Description"
              name="description"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
            />
            <Input
              title="Client Name"
              name="clientName"
              value={project.clientName}
              onChange={(e) => setProject({ ...project, clientName: e.target.value })}
            />
            <Input
              title="Start Date"
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={(e) => setProject({ ...project, startDate: e.target.value })}
            />
            <Input
              title="End Date"
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={(e) => setProject({ ...project, endDate: e.target.value })}
            />
            <div className={formStyles.form__container}>
              <label className={formStyles.form__label}> Add Employees (optional)</label>
              {employees.map((employee, index) => (
                <div key={index} className={formStyles.employee__form}>
                  <Input
                    name="employee"
                    title="Employee"
                    value={employees[index].employee._id}
                    onChange={(e) =>
                      setEmployees([
                        ...employees.slice(0, index),
                        {
                          ...employee,
                          employee: e.target.value.slice(-24)
                        },
                        ...employees.slice(index + 1)
                      ])
                    }
                  />
                  <Input
                    title="Rate"
                    name="rate"
                    value={employee.rate}
                    onChange={(e) =>
                      setEmployees([
                        ...employees.slice(0, index),
                        {
                          ...employee,
                          rate: e.target.value
                        },
                        ...employees.slice(index + 1)
                      ])
                    }
                  />
                  <Input
                    title="Role"
                    name="role"
                    value={employee.role}
                    onChange={(e) =>
                      setEmployees([
                        ...employees.slice(0, index),
                        {
                          ...employee,
                          role: e.target.value
                        },
                        ...employees.slice(index + 1)
                      ])
                    }
                  />
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
                  setEmployees([
                    ...employees,
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

export default AddItem;

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModalTitle, setModalContent } from '../../redux/projects/actions';
import { getProjects, editProject } from '../../redux/projects/thunks';
import { Spinner } from 'Components/Shared';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table';
import styles from './home.module.css';

function Home() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const employeeId = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(employeeId);
  const [employeesFiltered, setEmployeesFiltered] = useState([]);
  const [unpopulatedEmployees, setUnpopulatedEmployees] = useState([]);
  const [projectsByEmployee, setProjectsByEmployee] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [projectId, setProjectId] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const {
    list: projects,
    fetching,
    error,
    children,
    modalTitle
  } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    setProjectsByEmployee(
      projects.filter((project) =>
        project.employees.some((element) => element.employee._id === employeeId)
      )
    );
  }, [projects]);

  const removeProject = (projectId) => {
    const projectFindById = projects.find((project) => project._id === projectId);
    console.log('projectFindById:' + projectFindById);
    setEmployeesFiltered(
      projectFindById.employees.filter((employee) => employee.employee._id !== employeeId)
    );
    console.log('EmployeesFiltered:' + employeesFiltered);
    if (!employeesFiltered.length) {
      setUnpopulatedEmployees([]);
    } else {
      setUnpopulatedEmployees(
        employeesFiltered.map((employee) => {
          return { role: employee.role, rate: employee.rate, employee: employee.employee._id };
        })
      );
    }
    console.log(unpopulatedEmployees);
    dispatch(
      editProject(projectId, {
        name: projectFindById.name,
        startDate: projectFindById.startDate,
        endDate: projectFindById.endDate,
        description: projectFindById.description,
        clientName: projectFindById.clientName,
        active: projectFindById.active,
        employees: unpopulatedEmployees
      })
    );
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Start Date', value: 'startDate' },
    { heading: 'End Date', value: 'endDate' },
    { heading: 'Description', value: 'description' },
    { heading: 'Client', value: 'clientName' },
    { heading: 'Actions' }
  ];

  return (
    <section className={styles.container}>
      {rowId ? (
        !fetching ? (
          <Table
            title="Projects by Employee"
            data={projectsByEmployee}
            columns={columns}
            error={error}
            deleteItem={(projectId) => {
              dispatch(setModalTitle('Delete'));
              dispatch(setModalContent('Are you sure you want to delete it?'));
              setIsToConfirm(true);
              setModalDisplay(true);
              setProjectId(projectId);
            }}
            edit="/projects/form"
          />
        ) : (
          <Spinner />
        )
      ) : (
        <section className={styles.container}>
          <h2>Home</h2>
        </section>
      )}
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          setModalDisplay={setModalDisplay}
          isToConfirm={isToConfirm}
          onClickFunction={() => {
            removeProject(projectId);
            dispatch(getProjects());
          }}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
}

export default Home;

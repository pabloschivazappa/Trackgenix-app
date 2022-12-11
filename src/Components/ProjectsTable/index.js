import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModalTitle, setModalContent } from 'redux/projects/actions';
import { getProjects, editProject } from 'redux/projects/thunks';
import { Spinner } from 'Components/Shared';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import styles from 'Components/ProjectsTable/project.table.module.css';

function ProjectTable() {
  const [employeesFiltered, setEmployeesFiltered] = useState([]);
  const [unpopulatedEmployees, setUnpopulatedEmployees] = useState([]);
  const [projectsByEmployee, setProjectsByEmployee] = useState([]);
  const { id: employeeId } = useSelector((state) => state.auth);
  console.log('employeeId:', employeeId);

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
    if (projects.length > 0) {
      setProjectsByEmployee(
        projects.filter((project) =>
          project.employees.some((element) => element?.employee?._id === employeeId)
        )
      );
    }
  }, [projects]);

  console.log('Projects', projects);
  console.log('Projects by employee', projectsByEmployee);

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
      editProject(
        projectId,
        {
          name: projectFindById.name,
          startDate: projectFindById.startDate,
          endDate: projectFindById.endDate,
          description: projectFindById.description,
          clientName: projectFindById.clientName,
          active: projectFindById.active,
          employees: unpopulatedEmployees
        },
        true
      )
    );
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  const columns = [
    { heading: 'Project name', value: 'name' },
    {
      heading: 'Role',
      value: 'role'
    },
    {
      heading: 'Rate',
      value: 'rate'
    },
    { heading: 'Description', value: 'description' },
    { heading: 'Client', value: 'clientName' },
    { heading: 'Actions' }
  ];

  return (
    <section className={styles.container}>
      {!fetching ? (
        <Table
          title="Your projects"
          data={projectsByEmployee}
          columns={columns}
          error={!projectsByEmployee.length ? `You don't have any project` : error}
          deleteItem={(projectId) => {
            dispatch(setModalTitle('Quit project'));
            dispatch(setModalContent('Are you sure you want to leave the project?'));
            setIsToConfirm(true);
            setModalDisplay(true);
            setProjectId(projectId);
          }}
          edit="/projects/form"
          employeeId={employeeId}
          setHours={() => {
            dispatch(setModalTitle('Add Hours'));
            dispatch(setModalContent('HOURS'));
            setModalDisplay(true);
            setIsToConfirm(false);
          }}
          inProfile={true}
        />
      ) : (
        <Spinner />
      )}
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          setModalDisplay={setModalDisplay}
          isToConfirm={isToConfirm}
          onClickFunction={() => {
            removeProject(projectId);
          }}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
}

export default ProjectTable;

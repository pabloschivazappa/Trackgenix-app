import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModalTitle, setModalContent } from 'redux/projects/actions';
import { getProjects, editProject } from 'redux/projects/thunks';
import { Spinner } from 'Components/Shared';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import styles from 'Components/ProjectsTable/project.table.module.css';
import TimesheetsFormToProjects from 'Components/TimeSheets/FormToProjects';

function ProjectTable() {
  const [employeesFiltered, setEmployeesFiltered] = useState([]);
  const [unpopulatedEmployees, setUnpopulatedEmployees] = useState([]);
  const [projectsByEmployee, setProjectsByEmployee] = useState([]);
  const { id: employeeId } = useSelector((state) => state.auth);
  const [modalDisplay, setModalDisplay] = useState('');
  const [projectId, setProjectId] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const {
    list: projects,
    fetching,
    error,
    children,
    modalTitle
  } = useSelector((state) => state.projects);
  const [roleList, setRoleList] = useState([]);
  const { children: timesheetsChildren } = useSelector((state) => state.timeSheets);
  const { data } = useSelector((state) => state.auth);

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
      setRoleList(
        projects?.map((project) => {
          console.log('project', project.employees);
          return project.employees.filter((employee) => {
            return employee.role === 'PM' && employee.employee?._id == employeeId;
          });
        })
      );
    }
  }, [projects]);

  const removeProject = (projectId) => {
    const projectFindById = projects.find((project) => project._id === projectId);
    setEmployeesFiltered(
      projectFindById.employees.filter((employee) => employee.employee._id !== employeeId)
    );
    if (!employeesFiltered.length) {
      setUnpopulatedEmployees([]);
    } else {
      setUnpopulatedEmployees(
        employeesFiltered.map((employee) => {
          return { role: employee.role, rate: employee.rate, employee: employee.employee._id };
        })
      );
    }
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
          title="My Projects"
          data={projectsByEmployee}
          columns={columns}
          boolList={roleList?.map((e) => e.length > 0)}
          error={!projectsByEmployee.length ? `You don't have any project` : error}
          deleteItem={(projectId) => {
            dispatch(setModalTitle('Quit project'));
            dispatch(setModalContent('Are you sure you want to leave the project?'));
            setIsToConfirm(true);
            setModalDisplay(true);
            setProjectId(projectId);
            setIsForm(false);
          }}
          edit="/projects/form"
          employeeId={employeeId}
          setHours={(projectId) => {
            setProjectId(projectId);
            dispatch(setModalTitle('Add Hours'));
            dispatch(
              setModalContent(
                <TimesheetsFormToProjects projectId={projectId} setIsForm={setIsForm} />
              )
            );
            setModalDisplay(true);
            setIsToConfirm(false);
            setIsForm(true);
          }}
          inProfile={true}
          canCreate={data === 'ADMIN' || data === 'SUPER_ADMIN'}
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
          isForm={isForm}
        >
          {timesheetsChildren ? timesheetsChildren : children}
        </Modal>
      ) : null}
    </section>
  );
}

export default ProjectTable;

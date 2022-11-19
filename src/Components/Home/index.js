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

  const projectsByEmployee = projects.filter((project) =>
    project.employees.some((element) => element.employee._id === employeeId)
  );

  console.log(projects);
  console.log(projectsByEmployee);

  const removeProject = (projectId) => {
    const projectFindById = projects.find((project) => project._id === projectId);
    const projectsFiltered = projectFindById.employees.filter(
      (employee) => employee._id !== employeeId
    );
    console.log('Projects filtered' + projectsFiltered);
    dispatch(editProject(projectId, projectsFiltered));
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Description', value: 'description' },
    { heading: 'Client', value: 'clientName' },
    { heading: 'Actions' }
  ];

  return (
    <>
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
          onClickFunction={() => removeProject(projectId)}
        >
          {children}
        </Modal>
      ) : null}
    </>
  );
}

export default Home;

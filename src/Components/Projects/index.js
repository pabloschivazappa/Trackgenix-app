import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from '../../redux/projects/thunks';

function Projects() {
  const {
    list: projects,
    fetching,
    error,
    children,
    modalTitle
  } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const [modalDisplay, setModalDisplay] = useState('');
  // const [children, setChildren] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  // const [fetching, setFetching] = useState(true);

  // const getProjects = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
  //     const data = await response.json();
  //     if (response.ok) {
  //       setProjects(data.data);
  //     } else {
  //       setProjects([]);
  //     }
  //     setFetching(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  // const deleteItem = async (id) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
  //       method: 'DELETE'
  //     });
  //     const newProjects = projects.filter((listItem) => listItem._id !== id);
  //     setProjects(newProjects);
  //     if (!response.ok) {
  //       setChildren('Cannot delete project');
  //     } else {
  //       setChildren('Project deleted successfully');
  //     }
  //   } catch (error) {
  //     setChildren(error);
  //   }
  //   setIsToConfirm(false);
  //   setModalDisplay(true);
  // };

  const removeAdmins = (id) => {
    dispatch(deleteProject(id));
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Description', value: 'description' },
    { heading: 'Client', value: 'clientName' },
    { heading: 'Start Date', value: 'startDate' },
    { heading: 'End Date', value: 'endDate' },
    { heading: 'Employees', value: 'employees' },
    { heading: 'Actions' }
  ];

  return (
    <>
      <section className={styles.container}>
        {!fetching ? (
          <>
            <Table
              title="Projects"
              data={projects}
              columns={columns}
              error={error}
              deleteItem={(id) => {
                setIsToConfirm(true);
                setModalDisplay(true);
                setId(id);
              }}
              edit="/projects/form"
            />
          </>
        ) : (
          <Spinner />
        )}
        {modalDisplay ? (
          <Modal
            title={!isToConfirm ? modalTitle : 'Delete'}
            setModalDisplay={setModalDisplay}
            isToConfirm={isToConfirm}
            onClickFunction={() => removeAdmins(id)}
          >
            {!isToConfirm ? children : 'Are you sure you want to delete it?'}
          </Modal>
        ) : null}
      </section>
    </>
  );
}

export default Projects;

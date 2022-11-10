import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
import Spinner from '../Shared/Spinner';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  const [fetching, setFetching] = useState(true);

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      if (response.ok) {
        setProjects(data.data);
      } else {
        setProjects([]);
      }
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE'
      });
      const newProjects = projects.filter((listItem) => listItem._id !== id);
      setProjects(newProjects);
      if (!response.ok) {
        setChildren('Cannot delete project');
      } else {
        setChildren('Project deleted successfully');
      }
    } catch (error) {
      setChildren(error);
    }
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
              data={projects}
              columns={columns}
              deleteItem={(id) => {
                setIsToConfirm(true);
                setModalDisplay(true);
                setId(id);
                setChildren('¿Are you sure you want to delete it?');
              }}
              edit="/projects/form"
            />
            <Link to="/projects/form" className={styles.newEmployee}>
              +
            </Link>
          </>
        ) : (
          <Spinner />
        )}
        {modalDisplay ? (
          <Modal
            title={'Delete admin'}
            setModalDisplay={setModalDisplay}
            isToConfirm={isToConfirm}
            onClickFunction={() => deleteItem(id)}
          >
            {children}
          </Modal>
        ) : null}
      </section>
    </>
  );
}

export default Projects;

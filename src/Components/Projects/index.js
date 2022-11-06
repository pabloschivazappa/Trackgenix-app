import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import ProjectTable from './Table';
import Modal from './Modals/modal.js';
import Spinner from '../Shared/Spinner';

function Projects() {
  const [projects, setProjects] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const deleteItem = async (id) => {
    if (confirm('Are you sure that you want to delete this project?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
          method: 'DELETE'
        });
        setProjects([...projects.filter((listItem) => listItem._id !== id)]);
        const data = await response.json();
        setContentMessage(data.message);
        if (response.ok) {
          setProjects(projects.filter((projects) => projects._id !== id));
          setModalTitle('Success');
        } else {
          setModalTitle('Error');
        }
        setModalDisplay(true);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <section className={styles.container}>
        {projects.length > 0 ? (
          <ProjectTable list={projects} deleteItem={deleteItem} />
        ) : (
          <Spinner />
        )}
      </section>
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          contentMessage={contentMessage}
          setModalDisplay={setModalDisplay}
        />
      ) : null}
    </>
  );
}

export default Projects;

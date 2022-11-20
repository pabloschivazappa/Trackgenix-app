import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from '../../redux/projects/thunks';
import { setModalTitle, setModalContent } from '../../redux/projects/actions';

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
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(getProjects());
  }, []);

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
                dispatch(setModalTitle('Delete'));
                dispatch(setModalContent('Are you sure you want to delete it?'));
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
            title={modalTitle}
            setModalDisplay={setModalDisplay}
            isToConfirm={isToConfirm}
            onClickFunction={() => removeAdmins(id)}
          >
            {children}
          </Modal>
        ) : null}
      </section>
    </>
  );
}

export default Projects;

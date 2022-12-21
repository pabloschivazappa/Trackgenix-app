import { useEffect, useState } from 'react';
import styles from 'Components/Projects/projects.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, editProject } from 'redux/projects/thunks';
import { setModalTitle, setModalContent } from 'redux/projects/actions';

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
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const removeAdmins = (id) => {
    const foundProject = projects.find((project) => project._id === id);
    dispatch(
      editProject(
        id,
        {
          name: foundProject.name,
          clientName: foundProject.clientName,
          description: foundProject.description,
          startDate: foundProject.startDate,
          endDate: foundProject.endDate,
          employees: foundProject.employees.map((item) => {
            return {
              rate: item.rate,
              role: item?.role,
              employee: item.employee?._id
            };
          }),
          active: false
        },
        true
      )
    );
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
    data !== 'EMPLOYEE' && { heading: 'Actions' }
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
              inProjects={true}
              edit="/projects/form"
              canCreate={data === 'ADMIN' || data === 'SUPER_ADMIN'}
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

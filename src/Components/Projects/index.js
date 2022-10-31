import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import ProjectTable from './Table';
import AddItem from './Additem';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, { method: 'DELETE' });
    setProjects([...projects.filter((listItem) => listItem._id !== id)]);
  };

  const createItem = async ({
    name,
    description,
    clientName,
    createdAt,
    startDate,
    updateAt,
    endDate,
    employees: [{ employeeId, role, rate }]
  }) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/`, { method: 'POST' });
    const newProject = {
      name,
      description,
      clientName,
      createdAt,
      startDate,
      updateAt,
      endDate,
      employees: [{ employeeId, role, rate }]
    };
    setProjects([...projects, newProject]);
  };

  return (
    <section className={styles.container}>
      <AddItem createItem={createItem} />
      <ProjectTable
        list={projects}
        setProjects={setProjects}
        deleteItem={deleteItem}
        createItem={createItem}
      />
    </section>
  );
}

export default Projects;

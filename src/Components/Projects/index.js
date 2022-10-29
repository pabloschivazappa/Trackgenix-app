import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import ProjectTable from './Table';

function Projects() {
  const [projects, saveProject] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      saveProject(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(projects);

  return (
    <section className={styles.container}>
      <ProjectTable list={projects} />
    </section>
  );
}

export default Projects;

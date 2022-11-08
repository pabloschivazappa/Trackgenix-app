import ListItem from '../Listitem';
import tableStyles from './projectsTable.module.css';
import { Link } from 'react-router-dom';

const ProjectTable = ({ list, deleteItem }) => {
  return (
    <div>
      {list.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th id="projectName">Project Name</th>
              <th id="description">Description</th>
              <th id="clientName">Client Name</th>
              <th id="startingDate">Starting Date</th>
              <th id="endDate">End Date</th>
              <th id="employee">Employee</th>
              <th id="active">Active</th>
              <th id="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <ListItem key={item.id} listItem={item} deleteItem={deleteItem} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className={tableStyles.empty__list}>Empty list</p>
      )}
      <Link to={'/projects/form'} className={tableStyles.addLogo}>
        <button>
          Create
          <i className="fa-solid fa-plus"></i>
        </button>
      </Link>
    </div>
  );
};

export default ProjectTable;

import ListItem from '../Listitem';
import tableStyles from './projectsTable.module.css';

const ProjectTable = ({ list, deleteItem }) => {
  return (
    <div>
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
          <tr>
            <td className={tableStyles.addLogoTd}>
              <div>
                <a className={tableStyles.addLogo} href={'/projects/form'}>
                  <i className="fa-solid fa-plus"></i>
                </a>
              </div>
              <p className="addProjectp">Add project</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

import ListItem from '../Listitem';
import { FaPlusCircle } from 'react-icons/fa';
import styles from './projectsTable.module.css';
import { Modal } from '../Modals/modal';
import { useState } from 'react';

const ProjectTable = ({ list, deleteItem }) => {
  const [modalState, changeModalState] = useState(false);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th id="projectName">Project Name</th>
            <th id="description">Description</th>
            <th id="clientName">Client Name</th>
            <th id="createdAt">Created At</th>
            <th id="startingDate">Starting Date</th>
            <th id="lastupdate">Last Update</th>
            <th id="endDate">End Date</th>
            <th id="employee">Employee</th>
            <th id="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItem key={item.id} listItem={item} deleteItem={deleteItem} />
          ))}
          <tr>
            <td className={styles.addLogoTd}>
              <div>
                <FaPlusCircle
                  className={styles.addLogo}
                  onClick={() => changeModalState(!modalState)}
                />
              </div>
              <p className="addProjectp">Add project</p>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal state={modalState} changeState={changeModalState} />
    </div>
  );
};

export default ProjectTable;

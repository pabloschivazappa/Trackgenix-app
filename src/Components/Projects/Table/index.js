import React from 'react';
import ListItem from '../Listitem';
import './projectsTable.module.css';

const ProjectTable = ({ list }) => {
  return (
    <div calssName="table-container">
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
            <ListItem key={item.id} listItem={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

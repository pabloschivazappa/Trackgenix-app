import { useState } from 'react';

const AddItem = ({ createItem }) => {
  const [projects, setProjects] = useState({
    name: '',
    description: '',
    clientName: '',
    createdAt: '',
    startDate: '',
    updateAt: '',
    endDate: '',
    employees: [
      {
        employeeId: '',
        role: '',
        rate: ''
      }
    ]
  });
  const onChange = (e) => {
    setProjects({ ...projects, [e.target.name]: e.target.value });
  };
  const onChangeEmployee = (e) => {
    setProjects({ ...projects[0], [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createItem(projects);
    console.log(projects);
    setProjects({
      name: '',
      description: '',
      clientName: '',
      createdAt: '',
      startDate: '',
      updateAt: '',
      endDate: '',
      employees: [
        {
          employeeId: '',
          role: '',
          rate: ''
        }
      ]
    });
  };

  return (
    <div>
      <div>
        <h2>Add Project</h2>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>Project name</label>
            <input type="text" name="name" value={projects.name} onChange={onChange} />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={projects.description}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Client name</label>
            <input type="text" name="clientName" value={projects.clientName} onChange={onChange} />
          </div>
          <div>
            <label>Created at</label>
            <input type="date" name="createdAt" value={projects.createdAt} onChange={onChange} />
          </div>
          <div>
            <label>Start date</label>
            <input type="date" name="startDate" value={projects.startDate} onChange={onChange} />
          </div>
          <div>
            <label>Update at</label>
            <input type="date" name="updateAt" value={projects.updateAt} onChange={onChange} />
          </div>
          <div>
            <label>End date</label>
            <input type="date" name="endDate" value={projects.endDate} onChange={onChange} />
          </div>
          <div>
            <label>Employees</label>
            <input
              type="text"
              name="employees"
              value={projects.employees[0].employeeId}
              onChange={onChangeEmployee}
            />
            <input
              type="text"
              name="role"
              value={projects.employees[0].role}
              onChange={onChangeEmployee}
            />
            <input
              type="text"
              name="rate"
              value={projects.employees[0].rate}
              onChange={onChangeEmployee}
            />
          </div>
          <div>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;

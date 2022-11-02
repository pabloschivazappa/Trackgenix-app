import { useState, useEffect } from 'react';
import formStyles from './form.module.css';

const fullUrl = window.location.href;
const id = fullUrl.substring(fullUrl.lastIndexOf('=') + 1);
const initialValue = {
  name: '',
  description: '',
  clientName: '',
  startDate: '',
  endDate: '',
  employees: '',
  active: ''
};
const AddItem = ({ onCreateItem }) => {
  const [project, setProject] = useState(initialValue);
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeName] = useState([]);

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProject(data.data);
    } catch (error) {
      alert('Could not GET Projects', error);
    }
  };

  useEffect(async () => {
    if (window.location.href.includes('id')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        setProject({
          clientName: data.data.clientName,
          description: data.data.description,
          startDate: data.data.startDate.substr(0, 10),
          endDate: data.data.endDate.substr(0, 10),
          employees: [
            {
              employeeId: data.data.employeeId,
              rate: data.data.rate,
              role: data.data.role
            }
          ],
          name: data.data.name
        });
      } catch (error) {
        alert('Could not GET Project.', error);
      }
    } else {
      return null;
    }
  }, []);

  const editItem = async ({
    name,
    description,
    clientName,
    startDate,
    endDate,
    employees: employees,
    active
  }) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        clientName,
        startDate,
        endDate,
        employees: employees,
        active
      })
    });
    getProjects();
  };

  const createProject = async ({
    name,
    description,
    clientName,
    startDate,
    endDate,
    employees: employees,
    active
  }) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        clientName,
        startDate,
        endDate,
        employees: employees,
        active
      })
    });
    onCreateItem();
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployeeName(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(employeeData);
  const cleanInputs = () => {
    setProject(initialValue);
    setEmployees([]);
  };
  const onSubmit = (e) => {
    if (!window.location.href.includes('id')) {
      e.preventDefault();
      createProject(project);
      cleanInputs();
    } else {
      e.preventDefault();
      editItem(project);
      cleanInputs();
    }
  };

  return (
    <div className={formStyles.container}>
      <h2>Form</h2>
      <div>
        <form className={formStyles.form} onSubmit={onSubmit}>
          <div className={formStyles.formRaws}>
            <label>Project Name</label>
            <input
              className={formStyles.inputs}
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => setProject({ ...project, clientName: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>Description</label>
            <input
              className={formStyles.inputs}
              type="text"
              name="description"
              value={project.description}
              onChange={(e) => setProject({ ...project, clientName: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>Client Name</label>
            <input
              className={formStyles.inputs}
              type="text"
              name="clientName"
              value={project.clientName}
              onChange={(e) => setProject({ ...project, clientName: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>Start Date</label>
            <input
              className={formStyles.inputs}
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={(e) => setProject({ ...project, clientName: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>End date</label>
            <input
              className={formStyles.inputs}
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={(e) => setProject({ ...project, clientName: e.target.value })}
            />
          </div>
          <div className={formStyles.formRaws}>
            <label>Add Employees </label>
            {employees.map((employee, index) => (
              <div key={index} id="employee-form">
                <label>Employee</label>
                <select
                  type="text"
                  name="employeeId"
                  value={project.employees}
                  onChange={(e) =>
                    setEmployees([
                      ...employees.slice(0, index),
                      {
                        ...employee,
                        employeeId: e.target.value.slice(-24)
                      },
                      ...employees.slice(index + 1)
                    ])
                  }
                >
                  {setEmployeeName.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
                <label>Role</label>
                <select
                  type="text"
                  name="role"
                  value={project.employees}
                  onChange={(e) =>
                    setEmployees([
                      ...employees.slice(0, index),
                      {
                        ...employee,
                        role: e.target.value
                      },
                      ...employees.slice(index + 1)
                    ])
                  }
                >
                  <option></option>
                  <option>DEV</option>
                  <option>QA</option>
                  <option>PM</option>
                  <option>TL</option>
                </select>
                <label>Rate</label>
                <input
                  type="text"
                  name="rate"
                  value={project.employees[0].rate}
                  onChange={(e) => setProject({ ...project, clientName: e.target.value })}
                />
              </div>
            ))}
            <div>
              <input className={formStyles.submit} type="submit" value="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;

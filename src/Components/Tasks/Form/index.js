import { useEffect, useState } from 'react';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Modal';
import Input from '../../Shared/Input';

function TaskForm() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const urlID = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const [descriptionValue, setDescriptionValue] = useState('');

  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const editAndCreateMessage = (contentSubTitle, description) => {
    return `${contentSubTitle}:\n
    Description: ${description}`;
  };

  useEffect(async () => {
    if (idRegEx.test(urlID)) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${urlID}`);
        const data = await response.json();
        setDescriptionValue(data.data.description);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const editTask = async (urlID) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${urlID}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ description: descriptionValue })
      });
      const data = await response.json();
      setModalTitle('Edit Task');
      if (data.error === true) {
        setChildren(data.message);
      } else {
        setChildren(() => editAndCreateMessage(data.message, data.data.description));
      }
    } catch (error) {
      setChildren(error);
    }
    setModalDisplay(true);
  };

  const createTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ description: descriptionValue })
      });
      const data = await response.json();
      setModalTitle('Create Task');
      if (data.error === true) {
        setChildren(data.message);
      } else {
        setChildren(() => editAndCreateMessage(data.message, data.data.description));
      }
    } catch (error) {
      setChildren(error);
    }
    setModalDisplay(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    idRegEx.test(urlID) ? editTask(urlID) : createTask();
  };

  const changeDescription = (e) => {
    setDescriptionValue(e.target.value);
  };

  return (
    <>
      <Form
        onSubmitFunction={onSubmit}
        buttonMessage={idRegEx.test(urlID) ? 'Edit' : 'Create'}
        formTitle={idRegEx.test(urlID) ? 'Edit Task' : 'Create Task'}
      >
        <Input
          title="Description"
          name="description"
          value={descriptionValue}
          onChange={changeDescription}
        />
      </Form>
      {modalDisplay ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
}
export default TaskForm;

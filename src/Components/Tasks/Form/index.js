import { useEffect, useState } from 'react';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';
import Spinner from '../../Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { createTasks, editTasks } from '../../../redux/tasks/thunks';
import { setFetching } from '../../../redux/tasks/actions';

function TaskForm() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const urlID = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const { children, modalTitle, fetching } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [descriptionValue, setDescriptionValue] = useState({
    description: ''
  });
  const [modalDisplay, setModalDisplay] = useState('');

  useEffect(async () => {
    if (idRegEx.test(urlID)) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${urlID}`);
        const data = await response.json();
        setDescriptionValue({ description: data.data.description });
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  const postTasks = () => {
    dispatch(createTasks(descriptionValue));
    setModalDisplay(true);
  };

  const putTasks = () => {
    dispatch(editTasks(urlID, descriptionValue));
    setModalDisplay(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    urlID ? putTasks() : postTasks();
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
        {!fetching ? (
          <>
            <Input
              title="Description"
              name="description"
              value={descriptionValue.description}
              onChange={changeDescription}
            />
          </>
        ) : (
          <Spinner />
        )}
      </Form>
      {modalDisplay && !fetching ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
}
export default TaskForm;

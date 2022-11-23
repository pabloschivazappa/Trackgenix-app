import { useEffect, useState } from 'react';
import Modal from 'Components/Shared/Modal';
import Form from 'Components/Shared/Form';
import Input from 'Components/Shared/Input';
import Spinner from 'Components/Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { createTasks, editTasks } from 'redux/tasks/thunks';
import { setFetching } from 'redux/tasks/actions';
import { useForm } from 'react-hook-form';

function TaskForm() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const rowId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');
  const [values, setValues] = useState({
    description: ''
  });

  const [task, setTask] = useState('');

  const { register, handleSubmit, setValue, reset } = useForm({
    mode: 'onChange'
  });

  useEffect(async () => {
    if (rowId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
        const data = await response.json();
        setTask(data.data);
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  useEffect(() => {
    if (task && rowId) {
      setValue('description', task.description);

      setValues({
        description: task.description
      });
    }
  }, [task]);

  const postTasks = (data) => {
    dispatch(createTasks(data));
    setModalDisplay(true);
  };

  const putTasks = (data) => {
    dispatch(editTasks(id, data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    setValues({
      description: data.description
    });
    rowId ? putTasks(data) : postTasks(data);
  };

  const resetForm = () => {
    reset(values);
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        resetFunction={resetForm}
        buttonMessage={rowId ? 'Edit' : 'Create'}
        formTitle={rowId ? 'Edit Task' : 'Create Task'}
      >
        {!fetching ? (
          <>
            <Input title="Description" name="description" register={register} />
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

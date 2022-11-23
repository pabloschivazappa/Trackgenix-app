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
  const urlID = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const { children, modalTitle, fetching } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');
  const [values, setValues] = useState({
    description: ''
  });

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: values
  });

  useEffect(async () => {
    if (idRegEx.test(urlID)) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${urlID}`);
        const data = await response.json();
        setValues({ description: data.data.description });
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  useEffect(() => {
    reset(values);
  }, [values]);

  const postTasks = (data) => {
    dispatch(createTasks(data));
    setModalDisplay(true);
  };

  const putTasks = (data) => {
    dispatch(editTasks(urlID, data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    urlID ? putTasks(data) : postTasks(data);
    setValues(values);
  };

  const resetForm = () => {
    reset(values);
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage={idRegEx.test(urlID) ? 'Edit' : 'Create'}
        formTitle={idRegEx.test(urlID) ? 'Edit Task' : 'Create Task'}
        resetFunction={() => resetForm()}
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

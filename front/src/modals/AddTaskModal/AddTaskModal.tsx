import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import PrimaryTextInput from '../../components/PrimaryTextInput/PrimaryTextInput';
import { hideAddTaskModal, setTaskTitleValue } from '../../controllers/modalsController';
import { addNewTask } from '../../controllers/tasksController';
import { Modals } from '../../models/slices/modalsSlice';
import { RootState } from '../../models/store';
import Modal from '../Modal/Modal';
import styles from './AddTaskModal.module.css';

const AddTaskModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modals.modals[Modals.ADD_TASK])
  const handleHide = () => dispatch(hideAddTaskModal());

  return (
    <Modal 
      title="Add new task"
      hide={handleHide}
      isShow={modalState.isShow}
    >
      <Modal.Body>
        <div className={styles.bodyContent}>
          <PrimaryTextInput 
            label="Title:"
            htmlId="taskTitle"
            value={modalState.data.taskTitle}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => (
                dispatch(setTaskTitleValue(e.currentTarget.value))
              )
            }
          />
          <PrimaryBtn 
            className={styles.btn}
            onClick={() => dispatch(addNewTask())}
          >
            Add task
          </PrimaryBtn>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AddTaskModal;
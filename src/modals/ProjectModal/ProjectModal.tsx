import React from 'react';
import styles from './ProjectModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryTextInput from '../../components/PrimaryTextInput/PrimaryTextInput';
import { hideProjectModal } from '../../controllers/modalsController';
import { Modals } from '../../models/slices/modalsSlice';
import { RootState } from '../../models/store';
import Modal from '../Modal/Modal';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import PrimaryFileInput from '../../components/PrimaryFileInput/PrimaryFileInput';

const ProjectModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modals.modals[Modals.PROJECT]);
  const handleHide = () => dispatch(hideProjectModal());

  return (
    <Modal
      title="Project"
      isShow={modalState.isShow}
      hide={handleHide}
    >
      <Modal.Body>
        <div className={styles.bodyContent}>
          <PrimaryTextInput 
            htmlId="project-title"
            label="Title:"
          />
          <PrimaryFileInput 
            htmlId="project-img"
            label="Image:"
            className={styles.img}
          />
          <PrimaryBtn className={styles.btn}>
            Add project
          </PrimaryBtn>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ProjectModal;
import React from 'react';
import styles from './ProjectModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryTextInput from '../../components/PrimaryTextInput/PrimaryTextInput';
import { dropImgToPreview, hideProjectModal, loadImgToPreview, setProjectTitleValue } from '../../controllers/modalsController';
import { Modals } from '../../models/slices/modalsSlice';
import { RootState } from '../../models/store';
import Modal from '../Modal/Modal';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import PrimaryFileInput from '../../components/PrimaryFileInput/PrimaryFileInput';
import { addNewProject } from '../../controllers/projectsController';

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
        <>
          <div 
            className={`${styles.imgPreview} ${modalState.data.previewShowed ? styles.showed : ''}`}
          >
            <span 
              className={styles.dropImg}
              onClick={() => dispatch(dropImgToPreview())}
            >
              Drop image
            </span>
            <img 
              src={modalState.data.projectImg} 
              alt=""
              title="Project image"
            />
          </div>
          <div className={styles.bodyContent}>
            <PrimaryTextInput 
              htmlId="project-title"
              label="Title:"
              value={modalState.data.projectTitle}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => (
                  dispatch(setProjectTitleValue(e.currentTarget.value))
                )
              }
            />
            <PrimaryFileInput 
              htmlId="project-img"
              label="Image:"
              className={styles.img}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => (
                  dispatch(loadImgToPreview(e))
                )
              }
            />
            <PrimaryBtn 
              className={styles.btn}
              onClick={() => dispatch(addNewProject())}
            >
              Add project
            </PrimaryBtn>
          </div>
        </>
      </Modal.Body>
    </Modal>
  )
}

export default ProjectModal;
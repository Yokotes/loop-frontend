import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircleImageInput from '../../components/CircleImageInput/CircleImageInput';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import PrimaryTextInput from '../../components/PrimaryTextInput/PrimaryTextInput';
import { applyProfileSettings, setImgValue, setPasswordValue, setUsernameValue } from '../../controllers/profileController';
import { setGroupAlias } from '../../models/slices/profilePageSlice';
import { RootState } from '../../models/store';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const profileData = useSelector((state: RootState) => state.profile.currentUser);
  const profilePageData = useSelector((state: RootState) => state.profilePage.pageData);
  const groups = useSelector((state: RootState) => state.taskPage.groups);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(applyProfileSettings());
  } 

  useEffect(() => {
    dispatch(setUsernameValue(profileData.name))
    dispatch(setImgValue(profileData.img));

    for (let i = 0; i < groups.length; i++) {
      dispatch(setGroupAlias({
        id: i,
        value: groups[i].title
      }));
    }
  }, [profileData.name, profileData.img, dispatch, groups])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Profile settings
      </h1>
      <section className={styles.section}>
        <form 
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <CircleImageInput 
            defaultImg={profilePageData.img}
            imgAlt="Profile"
            className={styles.input}
            onChange={
              (e: React.ChangeEvent) => (
                dispatch(setImgValue(e))
              )
            }
          />
          <PrimaryTextInput 
            htmlId="profile-username"
            label="Username:"
            className={styles.input}
            value={profilePageData.username}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => (
                dispatch(setUsernameValue(e.currentTarget.value))
              )
            }
          />
          <PrimaryTextInput 
            htmlId="profile-password"
            label="New password:"
            className={styles.input}
            isPassword={true}
            value={profilePageData.password}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => (
                dispatch(setPasswordValue(e.currentTarget.value))
              )
            }
          />
          <PrimaryBtn
            className={styles.btn}
          >
            Change
          </PrimaryBtn>
        </form>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>
          Groups aliases
        </h2>
        <form className={styles.form}>
          {
            groups.map(
              (group, index) => (
                <PrimaryTextInput
                  key={group.id} 
                  htmlId={`profile-group-${group.id}`}
                  label={`#${group.id} Group`}
                  value={profilePageData.groupAliases[index]}
                  className={styles.input}
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => (
                      dispatch(setGroupAlias({
                        id: index,
                        value: e.currentTarget.value,
                      }))
                    )
                  }
                />
              )
            )
          }
        </form>
      </section>
    </div>
  )
}

export default ProfilePage;
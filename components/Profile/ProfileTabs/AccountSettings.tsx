import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form'
import styles from '../profile.module.scss';
import { uploadImageMultiple } from '../../../utils/uploadImageMultiple'
import { UserType } from '../../../Context/contextUtils';
import { hashIt } from '../../../utils/hashPass';
import { cleanObjects } from '../../../utils/cleanObjects'
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../query/user';
import { } from 'react';
import { AppContext } from './../../../Context/AppContextProvider';
const AccountSettings = ({ userData }: { userData: UserType }) => {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false)
  const [profileImg, setProfileImg] = useState<undefined | string>("")
  const [updateUserHandler] = useMutation(UPDATE_USER)
  const { setUser } = useContext(AppContext)
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur'
  })
  const editUserHandler = async (data: any) => {
    // let hashedPass = await hashIt(cleanData?.password);
    let newData = {
      username: data?.email,
      password: data?.password
    }
    let cleanData = cleanObjects(newData)
    updateUserHandler({
      variables: {
        ...cleanData,
        id: userData?.id
      }
    }).then(res => {
      console.log(res.data)
      setUser({ ...res.data.update_users_by_pk })
    }).catch(err => {
      console.log(err)
    })

  }
  const uploadProfileHandler = async (files: any) => {
    let blobs = await uploadImageMultiple(files)
    let imageBlob = blobs[0];
    let url = URL.createObjectURL(imageBlob)
    setProfileImg(url)

  }
  return (
    <section className="w-2/4 mx-auto">
      <h3 className="py-4 text-2xl font-semibold text-black">
        Account Information
      </h3>
      <form className="my-5" onSubmit={handleSubmit(editUserHandler)}>
        <div className="my-5 relative">
          <input className={styles.textInput} name="email" type="text" ref={register} />
          <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">User Email</small>
        </div>
        <div className="my-5 relative">
          <input className={styles.textInput} name="password" type={showPass ? "text" : 'password'} ref={register} />
          {showPass ?
            <FontAwesomeIcon className={styles.passIcon} onClick={() => setShowPass(false)} icon={faEyeSlash} />
            :
            <FontAwesomeIcon className={styles.passIcon} onClick={() => setShowPass(true)} icon={faEye} />}
          <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">User Password</small>
        </div>
        <div className="my-5 relative">
          <input className={styles.textInput} name="confirmPassword" type={showConfirmPass ? "text" : 'password'} ref={register} />
          {showConfirmPass ?
            <FontAwesomeIcon className={styles.passIcon} onClick={() => setShowConfirmPass(false)} icon={faEyeSlash} />
            : <FontAwesomeIcon className={styles.passIcon} onClick={() => setShowConfirmPass(true)} icon={faEye} />}
          <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">Confirm Password</small>
        </div>
        <div className="my-5 relative flex justify-between flex-start">
          {!profileImg ? <svg className="text-gray-300" style={{ width: '70px', height: '70px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            : <img src={profileImg} className={styles.profileImg} alt="user avatar" />}
          <div>
            <input
              type="file"
              accept="image/*,capture=camera"
              name="photo" id="photo"
              onChange={(e) => uploadProfileHandler(e.target.files)}
              value=""
              multiple={false}
              className={styles.customFileInput} />
            <label htmlFor="photo"
              className={styles.customFileLabel}>
              <div>Choose File</div>
              <span>Profile Picture</span>
            </label>
          </div>
        </div>
        <div className="my-8 relative flex justify-end items-start">
          <button className="btn-primary m-0 py-2 px-16 font-medium text-xl" type="submit">Save</button>
        </div>
      </form>
    </section>
  )
}

export default AccountSettings

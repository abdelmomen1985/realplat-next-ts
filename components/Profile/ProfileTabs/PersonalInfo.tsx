import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserType } from '../../../Context/contextUtils';
import styles from '../profile.module.scss';
import { cleanObjects } from './../../../utils/cleanObjects';
import { UPDATE_USER } from './../../../query/user';
import { useMutation } from '@apollo/client';

const PersonalInfo = ({ userData }: { userData: UserType }) => {
  const [test, setTest] = useState('testing it')
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur'
  })
  const [updateUserHandler] = useMutation(UPDATE_USER)

  const editUserInfoHandler = (data: any) => {
    console.log(data)
    let cleanData = cleanObjects(data)
    updateUserHandler({
      variables: {
        ...cleanData,
        id: userData?.id
      }
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <section className="w-2/4 mx-auto">
      <h3 className="py-4 text-2xl font-semibold text-black">
        Personal Information
      </h3>
      <form className="my-5" onSubmit={handleSubmit(editUserInfoHandler)}>
        <div className="my-5 relative">
          <input className={styles.textInput} name="name" type="text" ref={register} />
          <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">User Full Name</small>
        </div>

        <div className="my-5 relative">
          <select className={styles.textInput} name="gender" ref={register} >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">User's Gender</small>
        </div>
        <div className="my-5 relative">
          <select className={styles.textInput} name="marital_status" ref={register} >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="engaged">Engaged</option>
            <option value="in a relation ship">In a relationship</option>
            <option value="separated">Separated</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>

          </select>
          <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">User's Gender</small>
        </div>
        <div className="my-8 relative flex justify-end items-start">
          <button className="btn-primary m-0 py-2 px-16 font-medium text-xl" type="submit">Save</button>
        </div>
      </form>
    </section>
  )
}

export default PersonalInfo

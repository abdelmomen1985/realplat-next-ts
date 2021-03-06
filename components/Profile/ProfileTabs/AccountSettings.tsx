import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import styles from '../profile.module.scss';
import { cleanObjects } from '../../../utils/cleanObjects';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../query/user';
import { AppContext } from './../../../Context/AppContextProvider';
import { User } from '../../../interfaces';

const AccountSettings = () => {
	const [showPass, setShowPass] = useState<boolean>(false);
	const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
	const [updateUserHandler] = useMutation(UPDATE_USER);
	const { setUser, user } = useContext(AppContext);
	const { register, handleSubmit } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
	});
	const editUserHandler = async (data: any) => {
		// let hashedPass = await hashIt(cleanData?.password);
		let newData = {
			username: data?.email,
			password: data?.password,
		};
		let cleanData = cleanObjects(newData);
		updateUserHandler({
			variables: {
				...cleanData,
				id: user?.id,
			},
		})
			.then((res) => {
				console.log(res.data);
				setUser({ ...res.data.update_users_by_pk });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<section className="w-2/4 mx-auto">
			<h3 className="py-4 text-2xl font-semibold text-black">
				Account Information
			</h3>
			<form className="my-5" onSubmit={handleSubmit(editUserHandler)}>
				<div className="my-5 relative">
					<input
						className={styles.textInput}
						name="email"
						type="text"
						ref={register}
					/>
					<small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">
						User Email
					</small>
				</div>
				<div className="my-5 relative">
					<input
						className={styles.textInput}
						name="password"
						type={showPass ? 'text' : 'password'}
						ref={register}
					/>
					{showPass ? (
						<FontAwesomeIcon
							className={styles.passIcon}
							onClick={() => setShowPass(false)}
							icon={faEyeSlash}
						/>
					) : (
						<FontAwesomeIcon
							className={styles.passIcon}
							onClick={() => setShowPass(true)}
							icon={faEye}
						/>
					)}
					<small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">
						User Password
					</small>
				</div>
				<div className="my-5 relative">
					<input
						className={styles.textInput}
						name="confirmPassword"
						type={showConfirmPass ? 'text' : 'password'}
						ref={register}
					/>
					{showConfirmPass ? (
						<FontAwesomeIcon
							className={styles.passIcon}
							onClick={() => setShowConfirmPass(false)}
							icon={faEyeSlash}
						/>
					) : (
						<FontAwesomeIcon
							className={styles.passIcon}
							onClick={() => setShowConfirmPass(true)}
							icon={faEye}
						/>
					)}
					<small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">
						Confirm Password
					</small>
				</div>

				<div className="my-8 relative flex justify-end items-start">
					<button
						className="btn-primary m-0 py-2 px-16 font-medium text-xl"
						type="submit"
					>
						Save
					</button>
				</div>
			</form>
		</section>
	);
};

export default AccountSettings;

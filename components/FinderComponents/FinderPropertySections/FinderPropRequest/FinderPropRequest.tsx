import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faFacebookF,
	faLinkedinIn,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';
//@ts-ignore
import ReactStars from 'react-rating-stars-component';

import { AppContext } from '../../../../Context/AppContextProvider';
import useTranslation from './../../../../hooks/useTranslation';

import { Unit } from '../../../../interfaces';
import clsx from 'clsx';
import styles from '../finder-prop.module.scss';
import { useMutation } from '@apollo/client';
import {
	CREATE_ZOOM_MEETING,
	INSERT_MEETING,
} from '../../../../query/zoom-meetings';
const FinderPropRequest = ({ unit }: { unit: Unit }) => {
	const { t, locale } = useTranslation();
	const [showPhone, setShowPhone] = useState<boolean>(false);
	const { register, reset, handleSubmit, errors } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
	});
	const { user } = useContext(AppContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [createMeeting] = useMutation(CREATE_ZOOM_MEETING);

	const [insertMeeting] = useMutation(INSERT_MEETING);

	const createZoomMeeting = () => {
		setLoading(true);
		createMeeting()
			.then((res) => {
				console.log('sth is going on');
				insertMeeting({
					variables: {
						user_id: user?.id,
						zoom_data: { ...res?.data?.create_meeting },
					},
				})
					.then((res) => {
						window.open(
							res?.data?.insert_meetings_one?.zoom_data?.join_url,
							'_blank'
						);
						setLoading(false);
					})
					.catch((err) => {
						console.log(err.message);
					});
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const requestPropHandler = (data: any) => {
		console.log(data);
	};
	return (
		<div className={clsx(styles.contactCard)}>
			<div className="flex justify-between items-start">
				<div>
					<img
						src={unit?.compound?.developer?.media?.page_icon}
						alt=""
						className="my-2"
						style={{
							borderRadius: '50%',
							width: '80px',
							height: '80px',
							objectFit: 'cover',
							objectPosition: 'center right',
						}}
					/>
					<h3
						className="text-lg my-1 font-semibold"
						style={{
							color: '#454056',
						}}
					>
						{unit?.compound?.developer?.name[locale]}
					</h3>

					<div className="flex my-1 justify-start items-center">
						<ReactStars
							count={5}
							value={5}
							edit={false}
							size={24}
							activeColor="#ffd700"
						/>
						<span
							className="mx-1 text-base font-normal"
							style={{
								color: '#9691A4',
							}}
						>
							(5 Reviews)
						</span>
					</div>
					<h3
						className="text-base my-1 mb-2 font-normal"
						style={{
							color: '#666276',
						}}
					>
						{unit?.compound?.name[locale]}
					</h3>
					<div className="flex justify-start items-center">
						<button
							className="font-noto-sans text-base font-normal my-2 cursor-pointer mr-2"
							style={{ color: '#454056' }}
							onClick={() => setShowPhone(true)}
						>
							<img src="/images/icons/phone.svg" />
						</button>
						<button
							className="font-noto-sans text-base font-normal my-2 cursor-pointer mx-2"
							style={{ color: '#454056' }}
						>
							<img src="/images/call-to-action/whatsapp.svg" />
						</button>
						<button
							disabled={loading}
							onClick={createZoomMeeting}
							className="font-noto-sans text-base font-normal my-2 cursor-pointer mx-2"
							style={{ color: '#454056' }}
						>
							<img src="/images/call-to-action/zoom.svg" />
						</button>
					</div>
					{showPhone && (
						<h6
							className="font-noto-sans text-base font-normal my-2 text-center"
							style={{ color: '#454056' }}
						>
							{unit?.compound?.developer?.phone}
						</h6>
					)}
				</div>
				<div className="flex justify-center items-center">
					<button className={styles.socialMediaIcon}>
						<FontAwesomeIcon icon={faFacebookF} className="" />{' '}
					</button>
					<button className={styles.socialMediaIcon}>
						<FontAwesomeIcon icon={faLinkedinIn} className="" />{' '}
					</button>
				</div>
			</div>
			<hr className="w-10/12 mx-auto my-2" />
			<form
				onSubmit={handleSubmit(requestPropHandler)}
				className="mx-auto w-11/12 my-3"
			>
				<input
					className={clsx(styles.contactInput)}
					name="name"
					type="text"
					placeholder="Your name*"
					ref={register}
				/>
				<input
					className={clsx(styles.contactInput)}
					name="email"
					type="email"
					placeholder="Email*"
					ref={register}
				/>
				<input
					className={clsx(styles.contactInput)}
					name="phone"
					type="text"
					placeholder="Phone"
					ref={register({ valueAsNumber: true })}
				/>
				<input
					className={clsx(styles.contactInput)}
					type="date"
					name="moveInDate"
					placeholder="Desired Move-In-Date"
					ref={register({ valueAsDate: true })}
					min={new Date().toISOString().split('T')[0]}
					onChange={(e) => console.log(e.target.valueAsDate)}
				/>
				<textarea
					className={clsx(styles.contactInput)}
					rows={5}
					name="message"
					placeholder="message"
					ref={register}
				/>
				<div className="flex justify-start items-start my-2 ">
					<input
						type="checkbox"
						ref={register}
						name="send news"
						className="my-2"
					/>
					<label className="text-base font-normal mx-2">
						Send me news, tips and promos from Finder using my email.
					</label>
				</div>
				<button className="w-full my-4 mx-auto block bg-red rounded-md px-4 py-2 text-white text-lg font-medium">
					Send Request
				</button>
			</form>
		</div>
	);
};

export default FinderPropRequest;

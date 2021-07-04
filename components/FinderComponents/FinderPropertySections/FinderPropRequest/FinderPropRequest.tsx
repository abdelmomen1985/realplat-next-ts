import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faFacebookF,
	faLinkedinIn,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { AppContext } from '../../../../Context/AppContextProvider';

import styles from '../finder-prop.module.scss';
const FinderPropRequest = ({ unit }: { unit: any }) => {
	const { register, reset, handleSubmit, errors } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
	});
	const { user } = useContext(AppContext);

	const requestPropHandler = (data: any) => {
		console.log(data);
	};
	return (
		<section className="relative shadow-lg rounded-lg my-3 border-w border-gray-300 py-2 px-2">
			<div className="flex justify-between items-start">
				<div>
					<img src="/images/" alt="" className="" />
					<h3>{user?.name}</h3>
					<p></p>
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
					className="w-full rounded-md border-2 border-gray-300 px-3 py-2 my-4"
					name="name"
					type="text"
					placeholder="Your name*"
					ref={register}
				/>
				<input
					className="w-full rounded-md border-2 border-gray-300 px-3 py-2 my-4"
					name="email"
					type="email"
					placeholder="Email*"
					ref={register}
				/>
				<input
					className="w-full rounded-md border-2 border-gray-300 px-3 py-2 my-4"
					name="phone"
					type="text"
					placeholder="Phone"
					ref={register({ valueAsNumber: true })}
				/>
				<input
					className="w-full rounded-md border-2 border-gray-300 px-3 py-2 my-4"
					type="date"
					name="moveInDate"
					placeholder="Desired Move-In-Date"
					ref={register({ valueAsDate: true })}
					min={new Date().toISOString().split('T')[0]}
					onChange={(e) => console.log(e.target.valueAsDate)}
				/>
				<textarea
					className="w-full rounded-md border-2 border-gray-300 px-3 py-2 my-4"
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
		</section>
	);
};

export default FinderPropRequest;

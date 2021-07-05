import React, { useContext, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './offerSections.module.scss';
import { AppContext } from './../../../Context/AppContextProvider';
import { useMutation } from '@apollo/client';
import {
	INSERT_MEETING,
	CREATE_ZOOM_MEETING,
} from '../../../query/zoom-meetings';
import LoadingCircle from '../../common/LoadingCircle';
import { Unit } from '../../../interfaces';
const HeroOfferSection = ({ unit }: { unit: Unit }) => {
	const { isMobile, user } = useContext(AppContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [createMeeting] = useMutation(CREATE_ZOOM_MEETING);

	const [insertMeeting] = useMutation(INSERT_MEETING);

	const createZoomMeeting = () => {
		setLoading(true);
		createMeeting()
			.then((res) => {
				insertMeeting({
					variables: {
						user_id: user?.id,
						zoom_data: { ...res?.data?.create_meeting },
					},
				}).then((res) => {
					window.open(
						res?.data?.insert_meetings_one?.zoom_data?.join_url,
						'_blank'
					);
					setLoading(false);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<section className="w-full p-0 m-0 mb-5 relative">
			<Slide
				easing="ease-in"
				transitionDuration={500}
				autoplay={false}
				indicators={isMobile ? false : true}
				arrows={false}
			>
				{unit.projectImages.map((img: any, i: any) => (
					<div key={i} className={styles.eachSlide}>
						<div
							style={{
								backgroundImage: `url(${img})`,
								backgroundPosition: 'center',
								backgroundRepeat: 'none',
								backgroundSize: 'cover',
							}}
						></div>
					</div>
				))}
			</Slide>
			<div className="flex justify-center items-start">
				<div className="">
					<img className={styles.logoImg} src={unit.projectDeveloperLogo} />
				</div>
				<div className="mt-0 mb-4 mx-3 py-3 px-2">
					<h3 className="font-semibold  text-xl md:text-2xl text-black mt-2 mb-3">
						{unit.projectName}
					</h3>
					<h5 className="font-normal text-base md:text-lg text-black ">
						Prices From {unit.startingPrice}
					</h5>
					<div className="flex flex-wrap flex-col md:flex-row justify-between  items-center">
						<button className="btn-primary w-full my-2 mx-auto md:w-auto md:mr-2 ">
							Book Now
						</button>
						<button
							className="btn-outline-primary w-full mx-auto md:w-auto my-2 md:ml-2 flex justify-between items-center"
							disabled={loading}
							onClick={createZoomMeeting}
						>
							Zoom Meeting
							{loading && <LoadingCircle width={'25px'} margin={'0 5px'} />}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroOfferSection;

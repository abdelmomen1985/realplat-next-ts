import React, { useContext, useState, useEffect, useRef } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import clsx from 'clsx';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart,
	faShareAlt,
	faCompressAlt,
	faCompress,
} from '@fortawesome/free-solid-svg-icons';
import {
	EmailShareButton,
	FacebookShareButton,
	FacebookMessengerShareButton,
	WhatsappShareButton,
	TwitterShareButton,
	PinterestShareButton,
	EmailIcon,
	WhatsappIcon,
	TwitterIcon,
	PinterestIcon,
	FacebookIcon,
	FacebookMessengerIcon,
} from 'react-share';
import { AnimatePresence, motion } from 'framer-motion';
import { Unit } from '../../../interfaces';
import { AppContext } from './../../../Context/AppContextProvider';
import useTranslation from './../../../hooks/useTranslation';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './../../../query/user';
import CustomModal from './../../common/CustomModal/CustomModal';
import styles from './finder-prop.module.scss';

const FinderSingleUnitHero = ({ unit }: { unit: Unit }) => {
	const shareMenuRef = useRef<HTMLDivElement>(null);
	const { isMobile, user, setLoginModal, setComparing } = useContext(
		AppContext
	);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [showShareList, setShowShareList] = useState<boolean>(false);
	const { locale } = useTranslation();
	const [addWishList] = useMutation(ADD_TO_WISHLIST);
	const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);
	let shareUrl = `https://realplat-next-ts2-git-dev-abdelmomen1985.vercel.app/${locale}/units/${unit.id}`;
	const wishListHandler = async () => {
		// handle add to the server
		if (user) {
			unit.wishListed = !unit.wishListed;
			let wishListedUnit: Unit = { ...unit };
			if (wishListedUnit.wishListed) {
				await addWishList({
					variables: {
						user_id: user.id,
						unit_id: unit.id,
					},
				});
			} else {
				await removeWishList({
					variables: {
						user_id: user.id,
						unit_id: unit.id,
					},
				});
			}
		} else {
			console.log('u should see a modal man');
			setLoginModal(true);
		}
	};
	const compareHandler = () => {
		unit.comparing = !unit.comparing;
		let comparedUnit: Unit = { ...unit };
		setComparing(comparedUnit);
	};
	const clickHandler = (e: any) => {
		if (shareMenuRef.current?.contains(e.target)) {
			return;
		}
		setShowShareList(false);
	};
	useEffect(() => {
		document.addEventListener('mousedown', clickHandler);
		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);
	const shareMenuAnimations = {
		hidden: {
			opacity: 0,
			y: -15,
		},
		visible: {
			opacity: 1,
			y: 0,
		},
	};
	return (
    <>
      <h3 className="my-4 px-2 text-xl font-semibold text-black">
        {locale === "en" ? unit.sk_city?.name : unit.sk_city?.name_ar}
      </h3>
      <section className="relative">
        <div className="md:flex justify-between items-center">
          <div className="">
            <h4 className=""></h4>
            <div className="flex justify-start items-center">
              <div className="flex justify-center items-center px-2 text-gray-700 border-r-2">
                <span className="mx-2 text-base font-semibold">
                  {unit?.bedrooms}
                </span>
                <img
                  src="/images/icons/bed.svg"
                  className={styles.amenityIcon}
                />
              </div>
              <div className="flex justify-center items-center px-2 text-gray-700 border-r-2">
                <span className="mx-2 text-base font-semibold">
                  {unit?.bathrooms}
                </span>
                <img
                  src="/images/icons/bath.svg"
                  className={styles.amenityIcon}
                />
              </div>
              <div className="flex justify-center items-center px-2 text-gray-700">
                <span className="mx-2 text-base font-semibold">
                  {unit?.land} ㎡
                </span>
                <img
                  src="/images/finder/area.svg"
                  className={styles.amenityIcon}
                />
              </div>
            </div>
          </div>
					<hr className="md:hidden mt-2"/>
          <div className={styles.shareContainer}>
            {/* create tool tips for these buttons */}
            <button onClick={wishListHandler}>
              {unit.wishListed ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "red", fontSize: "25px" }}
                  aria-hidden="true"
                  className="text-custom-red hover:text-gray-400 mt-1 hover:text-opacity-50 text-opacity-50 text-xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-gray-400 mt-1 hover:text-red-600 text-opacity-50 text-xl"
                  aria-hidden="true"
                />
              )}
            </button>
            <button onClick={compareHandler}>
              {unit.comparing ? (
                <FontAwesomeIcon
                  className="text-primary text-xl mt-1"
                  icon={faCompress}
                />
              ) : (
                <FontAwesomeIcon
                  className="text-primary text-xl mt-1"
                  icon={faCompressAlt}
                />
              )}
            </button>
            <button onClick={() => setShowShareList((prev) => !prev)}>
              <FontAwesomeIcon
                className="text-primary text-xl"
                icon={faShareAlt}
              />
            </button>

            <AnimatePresence exitBeforeEnter>
              {showShareList && (
                <motion.div
                  variants={shareMenuAnimations}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  ref={shareMenuRef}
                  className={clsx(styles.shareContainer, styles.shareBtns)}
                >
                  <EmailShareButton url={shareUrl}>
                    <EmailIcon round={true} size={32} />
                  </EmailShareButton>
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon round={true} size={32} />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton
                    appId={"353216906150942"}
                    url={shareUrl}
                  >
                    <FacebookMessengerIcon round={true} size={32} />
                  </FacebookMessengerShareButton>

                  <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon round={true} size={32} />
                  </WhatsappShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon round={true} size={32} />
                  </TwitterShareButton>
                  <PinterestShareButton url={shareUrl} media="">
                    <PinterestIcon round={true} size={32} />
                  </PinterestShareButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div
          className={clsx(
            locale === "en" ? "flex-row" : "flex-row-reverse",
            "block md:flex justify-center items-start relative w-full my-2 mx-auto"
          )}
        >
          <div className="mr-1 h-full w-full md:w-2/3">
            <img
              style={{
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                height: "100%",
                width: "100%",
              }}
              src={unit.media.photos[0]}
            />
          </div>
          {!isMobile && (
            <div className="ml-1 w-1/3 relative">
              <img
                style={{ borderTopRightRadius: "10px", width: "99%" }}
                className="mb-1 w-full"
                src={unit.media.photos[1]}
              />
              <img
                style={{ borderBottomRightRadius: "10px", width: "99%" }}
                className="mt-1 w-full"
                src={unit.media.photos[2]}
              />
            </div>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-between items-center rounded-md px-2 md:px-3 py-1 md:py-2 text-white text-lg font-medium"
            style={{
              backgroundColor: "rgba(74, 54, 54, 0.8)",
              position: "absolute",
              right: "15px",
              bottom: "10%",
            }}
          >
            <span className="mr-2">+{unit.media.photos.length}</span>
            <img className="ml-2" src="/images/icons/img.svg" />
          </button>
        </div>
      </section>

      <CustomModal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Slide easing="ease-in" transitionDuration={500} autoplay={true}>
          {unit.media.photos.map((image: any, key: any) => {
            return (
              <img
                key={key}
                className="w-full"
                style={{ maxHeight: "250px" }}
                src={image}
                alt="unit image"
              />
            );
          })}
        </Slide>
      </CustomModal>
    </>
  );
};

export default FinderSingleUnitHero;
